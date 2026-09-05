"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  formPropertyTypes,
  formServiceTypes,
  formTimings,
  site,
  type City,
  type Service,
} from "@/config/site";

const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-card px-2.5 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type Draft = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service_type: string;
  timing: string;
  property_type: string;
  message: string;
  sms_consent: boolean;
  privacy_consent: boolean;
};

const drafts = new Map<string, Draft>();

function emptyDraft(service?: Service): Draft {
  return {
    name: "",
    phone: "",
    email: "",
    zip: "",
    service_type: service?.formValue ?? "ac repair",
    timing: service?.slug === "emergency-hvac" ? "emergency" : "this_week",
    property_type: "",
    message: "",
    sms_consent: false,
    privacy_consent: false,
  };
}

function draftKey(city?: City, service?: Service) {
  return `${city?.slug ?? "home"}:${service?.slug ?? "none"}`;
}

function readDraft(key: string, service?: Service): Draft {
  const cached = drafts.get(key);
  if (cached) return cached;
  return emptyDraft(service);
}

function writeDraft(key: string, draft: Draft) {
  drafts.set(key, draft);
}

function mailtoHref(draft: Draft, city?: City, service?: Service): string {
  const subject = encodeURIComponent(`${site.name} quote request`);
  const lines = [
    `Name: ${draft.name}`,
    `Phone: ${draft.phone}`,
    `Email: ${draft.email}`,
    `ZIP: ${draft.zip}`,
    `Service: ${draft.service_type}`,
    `Timing: ${draft.timing}`,
    `Property type: ${draft.property_type || "(not given)"}`,
    `City: ${city?.name ?? ""}`,
    `Service page: ${service?.slug ?? ""}`,
    `Message: ${draft.message}`,
    `SMS consent: ${draft.sms_consent ? "yes" : "no"}`,
  ];
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${site.leadsEmail}?subject=${subject}&body=${body}`;
}

type QuoteFormProps = {
  city?: City;
  service?: Service;
  listingId?: string;
  compact?: boolean;
};

/** Form v2 — required first, optionals behind More details. Same Formsubmit action. */
export function QuoteForm({ city, service, listingId, compact }: QuoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastKeyRef = useRef("");
  const key = draftKey(city, service);
  const [draft, setDraft] = useState<Draft>(() => readDraft(key, service));

  function update<K extends keyof Draft>(name: K, value: Draft[K]) {
    setDraft((prev) => {
      const next = { ...prev, [name]: value };
      writeDraft(key, next);
      return next;
    });
  }

  function onTextChange<K extends "name" | "phone" | "email" | "zip" | "message">(
    name: K,
    value: string
  ) {
    const lastKey = lastKeyRef.current;
    const clearing =
      value === "" &&
      draft[name] !== "" &&
      lastKey !== "Backspace" &&
      lastKey !== "Delete";
    if (clearing) {
      setDraft((current) => ({ ...current }));
      return;
    }
    update(name, value);
  }

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    setHidden(form, "page_url", window.location.href);
    setHidden(form, "gclid", params.get("gclid") ?? "");
    setHidden(form, "utm_source", params.get("utm_source") ?? "");
    setHidden(form, "utm_medium", params.get("utm_medium") ?? "");
    setHidden(form, "utm_campaign", params.get("utm_campaign") ?? "");
  }, []);

  return (
    <form
      ref={formRef}
      id="quote"
      action={site.formAction}
      method="POST"
      acceptCharset="UTF-8"
      autoComplete="off"
      onKeyDown={(event) => {
        lastKeyRef.current = event.key;
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        setDraft((current) => ({ ...current }));
      }}
      onFocusCapture={() => {
        window.setTimeout(() => {
          const form = formRef.current;
          if (!form) return;
          for (const name of ["name", "phone", "email", "zip"] as const) {
            const field = form.elements.namedItem(name);
            if (field instanceof HTMLInputElement && field.value) {
              update(name, field.value);
            }
          }
        }, 50);
      }}
      className="rounded-[16px] border border-border bg-card p-5 shadow-[0_10px_28px_rgba(21,32,43,0.08)]"
    >
      <h2 className="font-heading text-lg font-semibold sm:text-xl">
        Request a callback
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        No credit card. We route this to a company that covers your ZIP — or
        hold it until one is available.
      </p>

      <div className={`mt-4 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={fieldClassName}
            value={draft.phone}
            onChange={(event) => onTextChange("phone", event.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
            value={draft.email}
            onChange={(event) => onTextChange("email", event.target.value)}
          />
        </Field>
        <Field label="ZIP" htmlFor="zip">
          <input
            id="zip"
            name="zip"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            className={fieldClassName}
            value={draft.zip}
            onChange={(event) => onTextChange("zip", event.target.value)}
          />
        </Field>
        <Field label="Service" htmlFor="service_type">
          <select
            id="service_type"
            name="service_type"
            required
            className={fieldClassName}
            value={draft.service_type}
            onChange={(event) => update("service_type", event.target.value)}
          >
            {formServiceTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Timing"
          htmlFor="timing"
          className={compact ? "" : "sm:col-span-2"}
        >
          <select
            id="timing"
            name="timing"
            required
            className={fieldClassName}
            value={draft.timing}
            onChange={(event) => update("timing", event.target.value)}
          >
            {formTimings.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <details className="mt-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <summary className="cursor-pointer text-sm font-medium">
          More details
        </summary>
        <div className={`mt-3 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
          <Field
            label="Name (optional)"
            htmlFor="name"
            className={compact ? "" : "sm:col-span-2"}
          >
            <input
              id="name"
              name="name"
              autoComplete="name"
              className={fieldClassName}
              value={draft.name}
              onChange={(event) => onTextChange("name", event.target.value)}
            />
          </Field>
          <Field
            label="Property type (optional)"
            htmlFor="property_type"
            className={compact ? "" : "sm:col-span-2"}
          >
            <select
              id="property_type"
              name="property_type"
              className={fieldClassName}
              value={draft.property_type}
              onChange={(event) => update("property_type", event.target.value)}
            >
              {formPropertyTypes.map((item) => (
                <option key={item.value || "empty"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Message (optional)" htmlFor="message" className="mt-3">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="min-h-24 w-full rounded-lg border border-input bg-card px-2.5 py-2 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="What needs work, access notes, or a furnace/AC age."
            value={draft.message}
            onChange={(event) => onTextChange("message", event.target.value)}
          />
        </Field>
      </details>

      <label className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-accent/70 px-3 py-2.5 text-[13px] leading-[18px]">
        <input
          type="checkbox"
          name="sms_consent"
          value="true"
          required
          className="mt-1 size-4 accent-primary"
          checked={draft.sms_consent}
          onChange={(event) => update("sms_consent", event.target.checked)}
        />
        <span>
          You may text me about this request at the number I provided.
          Required.
        </span>
      </label>
      <label className="mt-2 flex items-start gap-2 rounded-lg border border-border bg-accent/70 px-3 py-2.5 text-[13px] leading-[18px]">
        <input
          type="checkbox"
          name="privacy_consent"
          value="true"
          required
          className="mt-1 size-4 accent-primary"
          checked={draft.privacy_consent}
          onChange={(event) => update("privacy_consent", event.target.checked)}
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy/" className="underline underline-offset-2">
            privacy policy
          </Link>
          . Required.
        </span>
      </label>

      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="_next" value={site.formRedirect} />
      <input type="hidden" name="_subject" value={`${site.name} quote request`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="page_url" defaultValue="" />
      <input type="hidden" name="city" defaultValue={city?.name ?? ""} />
      <input type="hidden" name="city_slug" defaultValue={city?.slug ?? ""} />
      <input type="hidden" name="state_abbr" defaultValue={city?.stateAbbr ?? ""} />
      <input type="hidden" name="service" defaultValue={service?.slug ?? ""} />
      <input type="hidden" name="listing_id" defaultValue={listingId ?? ""} />
      <input type="hidden" name="source" defaultValue="hvaclists.com" />
      <input type="hidden" name="gclid" defaultValue="" />
      <input type="hidden" name="utm_source" defaultValue="" />
      <input type="hidden" name="utm_medium" defaultValue="" />
      <input type="hidden" name="utm_campaign" defaultValue="" />

      <button
        type="submit"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90 sm:w-full"
      >
        Send request
      </button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        If the form cannot send, email{" "}
        <a href={mailtoHref(draft, city, service)} className="underline">
          {site.leadsEmail}
        </a>{" "}
        with the same details.
      </p>
    </form>
  );
}

function setHidden(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement) field.value = value;
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13px] leading-[18px] font-medium"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
