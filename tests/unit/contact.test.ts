import { describe, expect, it } from "vitest";

import { contactSchema } from "../../src/lib/validation/contact";
import { validateContactClient } from "../../src/lib/validation/contact-client";

const validContact = {
  name: "Jabir Test",
  email: "TEST@EXAMPLE.COM",
  company: "",
  projectType: "ai-ml",
  message: "A sufficiently detailed project message for validation.",
  website: "",
};

describe("contact validation", () => {
  it("normalizes a valid server submission", () => {
    const result = contactSchema.parse(validContact);

    expect(result.email).toBe("test@example.com");
    expect(result.projectType).toBe("ai-ml");
  });

  it("rejects incomplete server submissions", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "invalid",
      message: "short",
    });

    expect(result.success).toBe(false);
  });

  it("keeps lightweight client validation aligned with the server contract", () => {
    const result = validateContactClient(validContact);

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("test@example.com");
  });

  it("returns field-specific client errors", () => {
    const result = validateContactClient({
      ...validContact,
      name: "",
      projectType: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.name?.[0]).toMatch(/name/i);
      expect(result.fieldErrors.projectType?.[0]).toMatch(/project type/i);
    }
  });
});
