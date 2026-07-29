import { expect, test, type Page } from "@playwright/test";

function watchRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  return errors;
}

async function expectNoDuplicateIds(page: Page) {
  const duplicateIds = await page.locator("[id]").evaluateAll((elements) => {
    const counts = new Map<string, number>();
    elements.forEach((element) => {
      counts.set(element.id, (counts.get(element.id) ?? 0) + 1);
    });
    return [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([id]) => id);
  });

  expect(duplicateIds).toEqual([]);
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(
    dimensions.clientWidth + 1,
  );
}

test("home renders its complete semantic structure without runtime errors", async ({
  page,
}) => {
  const errors = watchRuntimeErrors(page);

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Engineering",
  );
  await expect(
    page.getByRole("heading", {
      name: "Products designed to think, adapt, and operate.",
      includeHidden: true,
    }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", {
      name: /Let's build what/i,
      includeHidden: true,
    }),
  ).toBeAttached();
  await expect(page.locator("main")).toBeVisible();
  await expectNoDuplicateIds(page);
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test("desktop navigation and case-study routes work", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "chromium-mobile");
  const errors = watchRuntimeErrors(page);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const workLink = page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Work" });
  await workLink.focus();
  await expect(workLink).toBeFocused();
  await workLink.press("Enter");
  await expect(page).toHaveURL(/#work$/);

  const projectLink = page.locator('a[href="/work/dev-pulse-ai"]').first();
  await projectLink.click();
  await expect(page).toHaveURL(/\/work\/dev-pulse-ai$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dev Pulse AI" }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test("contact form reports accessible validation errors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  const submit = page.getByRole("button", { name: "Send transmission" });
  await submit.click();

  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toBeVisible();
  await expect(page.getByText("Please select a project type.")).toBeVisible();
  await expect(
    page.getByText(/Please share at least 20 characters/),
  ).toBeVisible();
  await expect(page.locator('[name="name"]')).toBeFocused();
  await expect(page.locator('[name="name"]')).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("mobile menu traps and restores keyboard focus", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile");

  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.focus();
  await trigger.press("Enter");

  await expect(
    page.getByRole("button", { name: "Close navigation menu" }),
  ).toBeVisible();
  await expect(
    page.locator("#mobile-navigation").getByRole("link", { name: "Work" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion preserves readable layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = watchRuntimeErrors(page);

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator("[data-hero-line]").first()).toBeVisible();
  await expect(page.locator("[data-project-chapter]").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test("WebGL failure keeps the static Cognitive Engine fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      options?: unknown,
    ) {
      if (contextId === "webgl" || contextId === "webgl2") return null;
      return original.call(this, contextId, options);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-canvas", "fallback");
  await expect(page.locator("[data-static-engine]").first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
