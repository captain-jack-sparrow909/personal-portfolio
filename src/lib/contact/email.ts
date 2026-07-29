import { siteConfig } from "@/content/site";
import type { ContactInput } from "@/lib/validation/contact";
import { projectTypeLabels } from "@/lib/validation/contact-options";

type ContactMessage = Omit<ContactInput, "website">;

export type EmailDeliveryResult =
  | { ok: true; provider: "resend" | "development" }
  | { ok: false; reason: "configuration" | "provider" };

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function buildText(message: ContactMessage): string {
  return [
    `New portfolio enquiry from ${message.name}`,
    "",
    `Email: ${message.email}`,
    `Company: ${message.company || "Not provided"}`,
    `Project type: ${projectTypeLabels[message.projectType]}`,
    "",
    message.message,
  ].join("\n");
}

function buildHtml(message: ContactMessage): string {
  const paragraphs = escapeHtml(message.message)
    .split("\n")
    .map((paragraph) => `<p>${paragraph || "&nbsp;"}</p>`)
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.55">
      <h1 style="font-size:22px">New portfolio enquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(message.company || "Not provided")}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectTypeLabels[message.projectType])}</p>
      <hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
      ${paragraphs}
    </div>
  `;
}

export async function sendContactEmail(
  message: ContactMessage,
): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || siteConfig.email;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] Email delivery is not configured. Set RESEND_API_KEY and CONTACT_EMAIL_FROM.",
      );
      return { ok: false, reason: "configuration" };
    }

    console.info("[contact] Development delivery skipped safely.", {
      companyProvided: Boolean(message.company),
      messageLength: message.message.length,
      projectType: message.projectType,
      recipient: to,
    });
    return { ok: true, provider: "development" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject: `Portfolio enquiry — ${projectTypeLabels[message.projectType]} — ${message.name}`,
        text: buildText(message),
        html: buildHtml(message),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Email provider rejected the request.", {
        status: response.status,
      });
      return { ok: false, reason: "provider" };
    }

    return { ok: true, provider: "resend" };
  } catch (error) {
    console.error("[contact] Email provider request failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return { ok: false, reason: "provider" };
  }
}
