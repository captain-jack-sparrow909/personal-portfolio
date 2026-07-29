import { NextResponse } from "next/server";
import { z } from "zod";

import { sendContactEmail } from "@/lib/contact/email";
import { contactRateLimiter } from "@/lib/contact/rate-limit";
import { contactSchema, type ContactResponse } from "@/lib/validation/contact";

export const runtime = "nodejs";

const successMessage =
  "Thanks — your message is in the system. I’ll respond as soon as I can.";

function json(body: ContactResponse, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 80) || "none";

  return `${ip}:${userAgent}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > 25_000) {
    return json(
      { ok: false, message: "That message is too large to process." },
      { status: 413 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, message: "The submitted form could not be read." },
      { status: 400 },
    );
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim()
  ) {
    return json({ ok: true, message: successMessage });
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return json(
      {
        ok: false,
        message: "Please review the highlighted fields.",
        fieldErrors: errors.fieldErrors,
      },
      { status: 400 },
    );
  }

  const rateLimit = contactRateLimiter.check(getClientKey(request));

  if (!rateLimit.allowed) {
    const retryAfter = Math.max(
      1,
      Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
    );

    return json(
      {
        ok: false,
        message:
          "Too many messages were submitted from this connection. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  const message = {
    name: result.data.name,
    email: result.data.email,
    company: result.data.company,
    projectType: result.data.projectType,
    message: result.data.message,
  };
  const delivery = await sendContactEmail(message);

  if (!delivery.ok) {
    return json(
      {
        ok: false,
        message:
          delivery.reason === "configuration"
            ? "Email delivery is being configured. Please use the direct email link for now."
            : "The message could not be delivered right now. Please try again or email directly.",
      },
      { status: 503 },
    );
  }

  return json({ ok: true, message: successMessage });
}
