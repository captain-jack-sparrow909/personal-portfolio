import { projectTypeValues } from "./contact-options";
import type { ContactField, ContactInput } from "./contact";

type ClientValidationResult =
  | { success: true; data: ContactInput }
  | {
      success: false;
      fieldErrors: Partial<Record<ContactField, string[]>>;
    };

function stringValue(payload: Record<string, FormDataEntryValue>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactClient(
  payload: Record<string, FormDataEntryValue>,
): ClientValidationResult {
  const name = stringValue(payload, "name");
  const email = stringValue(payload, "email").toLowerCase();
  const company = stringValue(payload, "company");
  const projectType = stringValue(payload, "projectType");
  const message = stringValue(payload, "message");
  const website = stringValue(payload, "website");
  const fieldErrors: Partial<Record<ContactField, string[]>> = {};

  if (name.length < 2) {
    fieldErrors.name = ["Please enter your name."];
  } else if (name.length > 80) {
    fieldErrors.name = ["Name must be 80 characters or fewer."];
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = ["Please enter a valid email address."];
  } else if (email.length > 160) {
    fieldErrors.email = ["Email must be 160 characters or fewer."];
  }

  if (company.length > 120) {
    fieldErrors.company = ["Company must be 120 characters or fewer."];
  }

  if (
    !projectTypeValues.includes(
      projectType as (typeof projectTypeValues)[number],
    )
  ) {
    fieldErrors.projectType = ["Please select a project type."];
  }

  if (message.length < 20) {
    fieldErrors.message = [
      "Please share at least 20 characters about the project.",
    ];
  } else if (message.length > 4000) {
    fieldErrors.message = ["Message must be 4,000 characters or fewer."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  return {
    success: true,
    data: {
      name,
      email,
      company,
      projectType: projectType as ContactInput["projectType"],
      message,
      website,
    },
  };
}
