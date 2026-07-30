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
      name: "Products I have shaped, built, and put to work.",
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

test("short desktop layouts keep hero actions and contact pills contained", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "chromium-mobile");
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "ready");
  await page.waitForTimeout(1_400);

  const exploreLink = page.getByRole("link", {
    name: "Explore the systems",
  });
  const contactLink = page.getByRole("link", {
    name: "Start a conversation",
  });
  const focusRail = page.getByText("Intelligent product systems", {
    exact: false,
  });
  const rail = focusRail.locator("..");
  const [exploreBox, contactBox, railBox] = await Promise.all([
    exploreLink.boundingBox(),
    contactLink.boundingBox(),
    rail.boundingBox(),
  ]);

  expect(exploreBox).not.toBeNull();
  expect(contactBox).not.toBeNull();
  expect(railBox).not.toBeNull();
  expect(Math.abs(exploreBox!.y - contactBox!.y)).toBeLessThan(2);
  expect(
    Math.max(
      exploreBox!.y + exploreBox!.height,
      contactBox!.y + contactBox!.height,
    ),
  ).toBeLessThanOrEqual(railBox!.y - 16);
  await expect(rail).toHaveCSS("transform", "none");

  await page.goto("/#contact");
  const bestFitLabels = [
    "AI products and applied ML",
    "Developer tools and platform engineering",
    "High-craft web and mobile products",
    "Technical product architecture",
  ];

  for (const label of bestFitLabels) {
    const capsule = page.getByText(label, { exact: true });
    await expect(capsule).toHaveCSS("white-space", "nowrap");
    const dimensions = await capsule.evaluate((element) => ({
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth,
      horizontalInsets: (() => {
        const capsuleBox = element.getBoundingClientRect();
        const textRange = document.createRange();
        textRange.selectNodeContents(element);
        const textBox = textRange.getBoundingClientRect();

        return {
          left: textBox.left - capsuleBox.left,
          right: capsuleBox.right - textBox.right,
        };
      })(),
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(
      dimensions.clientHeight + 1,
    );
    expect(dimensions.horizontalInsets.left).toBeGreaterThanOrEqual(8);
    expect(dimensions.horizontalInsets.right).toBeGreaterThanOrEqual(8);
  }
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

test("RontgenAI presents public proof and engineering evidence", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/rontgenai");

  await expect(
    page.getByRole("heading", { level: 1, name: "RontgenAI" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Open it. Inspect it. Use it." }),
  ).toBeVisible();
  await expect(page.getByText("What I personally built")).toBeVisible();
  await expect(page.getByText("Public preview").first()).toBeVisible();
  await expect(
    page.locator('#public-proof a[href^="https://rontgenai.dev/app/"]'),
  ).toHaveCount(7);
  await expectNoDuplicateIds(page);
  await expectNoHorizontalOverflow(page);
});

test("case studies expose curated real-product captures", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const galleries = [
    {
      count: 5,
      slug: "dev-pulse-ai",
      title: "The editorial product at work.",
    },
    {
      count: 7,
      slug: "rontgenai",
      title: "Seven products, one live workspace.",
    },
    {
      count: 4,
      slug: "cognoraai",
      title: "The learner's context, rendered.",
    },
    {
      count: 6,
      slug: "orkestriaai",
      title: "Supervision is part of the product.",
    },
  ] as const;

  for (const galleryDetails of galleries) {
    await page.goto(`/work/${galleryDetails.slug}#product-gallery`, {
      waitUntil: "domcontentloaded",
    });

    const gallery = page.getByRole("region", {
      name: galleryDetails.title,
    });
    await expect(gallery).toBeVisible();
    await expect(gallery.locator("figure")).toHaveCount(galleryDetails.count);
    const firstImage = gallery.locator("img").first();
    await firstImage.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        firstImage.evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expectNoHorizontalOverflow(page);
  }
});

test("product capture lightbox supports keyboard navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/rontgenai#product-gallery");

  const firstCapture = page.getByRole("button", {
    name: "Open The product promise is immediate capture",
  });
  await firstCapture.click();

  const lightbox = page.getByRole("dialog", {
    name: "The product promise is immediate",
  });
  await expect(lightbox).toBeVisible();
  await page.keyboard.press("ArrowRight");
  const nextLightbox = page.getByRole("dialog", {
    name: "Every focused tool remains one click away",
  });
  await expect(
    nextLightbox.getByRole("heading", {
      name: "Every focused tool remains one click away",
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nextLightbox).toBeHidden();
  await expect(firstCapture).toBeFocused();
});

test("System Navigator opens from the keyboard and reaches the lab", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+K");

  const navigator = page.getByRole("dialog", { name: "System Navigator" });
  await expect(navigator).toBeVisible();
  const labCommand = navigator.getByRole("option", {
    name: /Explore Systems Lab/,
  });
  await labCommand.click();

  await expect(page).toHaveURL(/\/lab$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Ideas you can touch/ }),
  ).toBeVisible();
});

test("Systems Lab experiments expose deterministic interaction states", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/lab");

  await page.getByRole("button", { name: "Run sample scan" }).click();
  await expect(page.getByText("SCAN COMPLETE")).toBeVisible();

  await page.getByRole("button", { name: "Start simulated run" }).click();
  await expect(
    page.getByRole("heading", { name: "Approval required" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Approve" }).click();
  await expect(
    page.getByRole("heading", { name: "Approved for execution" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Inspect retrieval" }).click();
  await expect(page.getByText("incident-4821.md")).toBeVisible();
  await expectNoHorizontalOverflow(page);
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
