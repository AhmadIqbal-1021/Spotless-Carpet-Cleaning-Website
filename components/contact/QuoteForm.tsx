"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import { submitQuoteEnquiry } from "@/app/contact/actions";
import { initialQuoteFormState } from "@/lib/contact";
import { enquiryServiceOptions, type EnquiryServiceValue } from "@/lib/services";
import { business } from "@/lib/business";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/30";

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(
    submitQuoteEnquiry,
    initialQuoteFormState
  );
  const [service, setService] = useState<EnquiryServiceValue | "">("");

  const formId = useId();
  const errors = state.errors || {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-2xl border border-brand-teal/30 bg-brand-teal-light/60 p-6 sm:p-8"
      >
        <h3 className="text-xl font-bold text-brand-navy">
          Your enquiry is ready to send
        </h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ve prepared your enquiry with the details you entered. Tap
          below to send it to us on WhatsApp — the fastest way to reach us —
          or call us directly.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {state.whatsappLink ? (
            <a
              href={state.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white hover:bg-whatsapp-dark"
            >
              Send via WhatsApp
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              WhatsApp is not yet configured — please call us to complete
              your enquiry.
            </p>
          )}
          {business.phone.number ? (
            <a
              href={`tel:${business.phone.number.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
            >
              Call {business.phone.number}
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {state.status === "error" && Object.keys(errors).length === 0 ? (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please check the form and try again.
        </p>
      ) : null}

      <div>
        <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={inputClasses}
        />
        <FieldError id={`${formId}-name-error`} message={errors.name} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className={inputClasses}
          />
          <FieldError id={`${formId}-phone-error`} message={errors.phone} />
        </div>

        <div>
          <label htmlFor={`${formId}-postcode`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
            Postcode <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-postcode`}
            name="postcode"
            type="text"
            required
            autoComplete="postal-code"
            aria-invalid={Boolean(errors.postcode)}
            aria-describedby={errors.postcode ? `${formId}-postcode-error` : undefined}
            className={inputClasses}
          />
          <FieldError id={`${formId}-postcode-error`} message={errors.postcode} />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-service`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Service <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${formId}-service`}
          name="service"
          required
          value={service}
          onChange={(event) => setService(event.target.value as EnquiryServiceValue)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? `${formId}-service-error` : undefined}
          className={inputClasses}
        >
          <option value="" disabled>
            Select a service
          </option>
          {enquiryServiceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError id={`${formId}-service-error`} message={errors.service} />

        {service === "sofa" ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Let us know the sofa size (2 seater, 3 seater, or L-shape) in
            your message below.
          </p>
        ) : null}
        {service === "mattress" ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Let us know if it&apos;s a normal or king-size mattress in your
            message below.
          </p>
        ) : null}
      </div>

      {service === "carpet" ? (
        <div>
          <label htmlFor={`${formId}-rooms`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
            Number of rooms
          </label>
          <select id={`${formId}-rooms`} name="rooms" className={inputClasses} defaultValue="">
            <option value="">Not sure</option>
            <option value="1">1 room</option>
            <option value="2">2 rooms</option>
            <option value="3">3 rooms</option>
            <option value="4">4 rooms</option>
          </select>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
            Email <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={inputClasses}
          />
          <FieldError id={`${formId}-email-error`} message={errors.email} />
        </div>

        <div>
          <label htmlFor={`${formId}-date`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
            Preferred date <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={`${formId}-date`}
            name="preferredDate"
            type="date"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-semibold text-brand-navy">
          Message <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          maxLength={1000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={inputClasses}
        />
        <FieldError id={`${formId}-message-error`} message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Submitting…" : "Get My Quote"}
      </button>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. See our{" "}
        <Link href="/privacy" className="underline hover:text-brand-navy">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
