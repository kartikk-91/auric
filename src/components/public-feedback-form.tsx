/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCcw } from "lucide-react";
import { EmojiRating } from "@/components/organization/emoji-rating";
import { submitFeedback } from "@/actions/submit-feedback";

type Field = {
  id: string;
  type: "text" | "textarea" | "rating";
  label: string;
  required?: boolean;
};

export function PublicFeedbackForm({
  companyId,
  schema,
}: {
  companyId: string;
  schema: any;
}) {
  const [isPending, startTransition] = useTransition();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function normalizeSchema(schema: any) {
    if (schema?.fields && Array.isArray(schema.fields)) {
      return schema;
    }

    const questions = Array.isArray(schema) ? schema : [];

    return {
      title: "Customer Feedback",
      logoUrl: "",
      fields: [
        { id: "name", type: "text", label: "Name", required: true },
        { id: "state", type: "text", label: "State", required: true },
        { id: "country", type: "text", label: "Country", required: true },

        ...questions.map((q: any, i: number) => ({
          id: i === 0 ? "overall" : q.id,
          type: "rating",
          label: q.label ?? "Rating",
          required: q.required ?? false,
        })),

        {
          id: "text",
          type: "textarea",
          label: "Additional feedback",
          required: true,
        },
      ],
    };
  }

  const normalized = normalizeSchema(schema);
  const fields: Field[] = normalized.fields;

  function submit() {
    if (submitted) return;

    setError(null);

    startTransition(async () => {
      try {
        const ratingPayload: {
          type: "OVERALL" | "CUSTOM";
          label?: string;
          value: number;
        }[] = [];

        const otherFields: Record<string, unknown> = {};
        let text: string | undefined;

        for (const field of fields) {
          if (field.type === "rating") {
            const value = ratings[field.id];

            if (field.required && !value) {
              throw new Error(`Please rate: ${field.label}`);
            }

            if (value != null) {
              ratingPayload.push({
                type: field.id === "overall" ? "OVERALL" : "CUSTOM",
                label: field.id === "overall" ? undefined : field.label,
                value,
              });
            }
          } else {
            const v = values[field.id];
            otherFields[field.id] = v;
            if (field.id === "text") text = v;
          }
        }

       
        const name = values["name"];
        const state = values["state"];
        const country = values["country"];

        await submitFeedback({
          companyId,
          name,
          state,
          country,
          text,
          fields: otherFields,
          ratings: ratingPayload,
        });

        setSubmitted(true);

        localStorage.setItem(
          `auric_submitted_${companyId}`,
          "true"
        );
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      }
    });
  }

  if (submitted) {
    return (
      <div className="relative mx-auto max-w-4xl">
        <div className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border shadow-2xl rounded-3xl overflow-hidden">
          <ThankYouScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl sm:px-4 sm:py-10">
      <div className="relative overflow-hidden sm:rounded-3xl border bg-gradient-to-br from-indigo-50 via-white to-emerald-50 shadow-xl">

        <div className="absolute inset-x-0 -top-24 h-32 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 blur-3xl opacity-60" />

        <div className="relative px-6 md:px-10 py-10 space-y-10">

          <div className="flex flex-col items-center gap-3 text-center">
            {normalized.logoUrl && (
              <Image
                src={normalized.logoUrl}
                alt="Company Logo"
                width={72}
                height={72}
                className="h-16 w-16 rounded-xl object-cover shadow"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {normalized.title}
            </h1>
            <p className="text-sm text-gray-500 max-w-md">
              We value your feedback. Please take a moment to share your experience.
            </p>
          </div>

          <Section title="Your details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields
                .filter((f) => f.type === "text" || f.type === "textarea")
                .map((f) => (
                  <FieldWrapper
                    key={f.id}
                    label={f.label}
                    required={f.required}
                    className={f.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    {f.type === "text" ? (
                      <Input
                        value={values[f.id] || ""}
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            [f.id]: e.target.value,
                          }))
                        }
                        className="rounded-xl"
                      />
                    ) : (
                      <Textarea
                        value={values[f.id] || ""}
                        onChange={(e) =>
                          setValues((v) => ({
                            ...v,
                            [f.id]: e.target.value,
                          }))
                        }
                        className="rounded-xl min-h-[120px]"
                      />
                    )}
                  </FieldWrapper>
                ))}
            </div>
          </Section>

          <Section title="Rate your experience">
            <div className="space-y-5">
              {fields
                .filter((f) => f.type === "rating")
                .map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl border bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {q.label}
                        {q.required && <span className="text-red-500"> *</span>}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:inline">Tap an emoji</span>
                    </div>

                    <div className="mt-3">
                      <EmojiRating
                        onSelect={(v: number) =>
                          setRatings((r) => ({
                            ...r,
                            [q.id]: v,
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </Section>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              onClick={submit}
              disabled={isPending}
              size="lg"
              className="w-full sm:w-auto rounded-full px-8"
            >
              {isPending ? "Submitting…" : "Submit feedback"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="rounded-full text-gray-500"
              onClick={() => {
                setRatings({});
                setValues({});
              }}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur px-4 py-6 md:p-8">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ThankYouScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
        <span className="text-2xl">🎉</span>
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">
        Thank you for your feedback!
      </h2>

      <p className="mt-2 text-gray-600 max-w-md">
        Your response has been submitted successfully.
      </p>
    </div>
  );
}
