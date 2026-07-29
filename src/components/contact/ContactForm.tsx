"use client";

import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";

import {
  contactSchema,
  projectTypeLabels,
  projectTypeValues,
  type ContactField,
  type ContactResponse,
} from "@/lib/validation/contact";

import styles from "./ContactForm.module.css";

type FormStatus =
  | { state: "idle"; message: "" }
  | { state: "submitting"; message: string }
  | { state: "success" | "error"; message: string };

const initialStatus: FormStatus = { state: "idle", message: "" };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<ContactField, string[]>>
  >({});

  const focusFirstInvalidField = (
    errors: Partial<Record<ContactField, string[]>>,
  ) => {
    const firstField = Object.keys(errors)[0];
    if (!firstField) return;

    formRef.current
      ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
      ?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "submitting", message: "Sending your message…" });
    setFieldErrors({});

    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      const errors = z.flattenError(parsed.error).fieldErrors;
      setFieldErrors(errors);
      setStatus({
        state: "error",
        message: "Please review the highlighted fields.",
      });
      focusFirstInvalidField(errors);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as ContactResponse;

      if (!result.ok) {
        const errors = result.fieldErrors ?? {};
        setFieldErrors(errors);
        setStatus({ state: "error", message: result.message });
        focusFirstInvalidField(errors);
        return;
      }

      formRef.current?.reset();
      setStatus({ state: "success", message: result.message });
    } catch {
      setStatus({
        state: "error",
        message:
          "The connection was interrupted. Please try again or use the direct email link.",
      });
    }
  };

  const fieldError = (field: ContactField) => fieldErrors[field]?.[0];

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className={styles.heading}>
        <p>Project transmission</p>
        <span>SECURE CHANNEL / 01</span>
      </div>

      <div className={styles.row}>
        <Field
          autoComplete="name"
          error={fieldError("name")}
          label="Name"
          name="name"
          placeholder="Your name"
          required
        />
        <Field
          autoComplete="email"
          error={fieldError("email")}
          label="Email"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>

      <div className={styles.row}>
        <Field
          autoComplete="organization"
          error={fieldError("company")}
          label="Company"
          name="company"
          placeholder="Optional"
        />
        <label className={styles.field}>
          <span>
            Project type <b aria-hidden="true">*</b>
          </span>
          <select
            aria-describedby={
              fieldError("projectType") ? "projectType-error" : undefined
            }
            aria-invalid={Boolean(fieldError("projectType"))}
            defaultValue=""
            name="projectType"
            required
          >
            <option disabled value="">
              Select a system
            </option>
            {projectTypeValues.map((value) => (
              <option key={value} value={value}>
                {projectTypeLabels[value]}
              </option>
            ))}
          </select>
          {fieldError("projectType") ? (
            <small id="projectType-error" role="alert">
              {fieldError("projectType")}
            </small>
          ) : null}
        </label>
      </div>

      <label className={styles.field}>
        <span>
          Project signal <b aria-hidden="true">*</b>
        </span>
        <textarea
          aria-describedby={fieldError("message") ? "message-error" : undefined}
          aria-invalid={Boolean(fieldError("message"))}
          maxLength={4000}
          name="message"
          placeholder="What are you building, where is it now, and how could I help?"
          required
          rows={6}
        />
        {fieldError("message") ? (
          <small id="message-error" role="alert">
            {fieldError("message")}
          </small>
        ) : null}
      </label>

      <label aria-hidden="true" className={styles.trap}>
        Website
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <div className={styles.footer}>
        <p aria-live="polite" data-state={status.state} role="status">
          {status.message || "Typical response window: 1–2 working days."}
        </p>
        <button
          data-magnetic
          disabled={status.state === "submitting"}
          type="submit"
        >
          <span>
            {status.state === "submitting"
              ? "Transmitting…"
              : "Send transmission"}
          </span>
          <i aria-hidden="true">↗</i>
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  autoComplete: string;
  error?: string;
  label: string;
  name: "name" | "email" | "company";
  placeholder: string;
  required?: boolean;
  type?: "email" | "text";
};

function Field({
  autoComplete,
  error,
  label,
  name,
  placeholder,
  required,
  type = "text",
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className={styles.field}>
      <span>
        {label} {required ? <b aria-hidden="true">*</b> : null}
      </span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        maxLength={name === "name" ? 80 : name === "email" ? 160 : 120}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {error ? (
        <small id={errorId} role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}
