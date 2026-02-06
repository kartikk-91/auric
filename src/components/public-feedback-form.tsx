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
          label: "Feedback",
          required: true,
        },
      ],
    };
  }
  
  const normalized = normalizeSchema(schema);
  const fields: Field[] = normalized.fields;

  function submit() {
    startTransition(async () => {
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

      await submitFeedback({
        companyId,
        ratings: ratingPayload,
        fields: otherFields,
        text,
      });
    });
  }

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border shadow-2xl rounded-3xl overflow-hidden">
        
        <div className="absolute inset-x-0 -top-12 h-24 blur-2xl opacity-70 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400" />

        <div className="px-6 md:px-10 pt-10 pb-8">
          
          <div className="flex flex-col items-center gap-3">
            {normalized.logoUrl && (
              <Image
                src={normalized.logoUrl}
                alt="Company Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover shadow"
              />
            )}
            <div className="text-2xl font-bold text-gray-800 text-center">
              {normalized.title}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields
                .filter(
                  (f) => f.type === "text" || f.type === "textarea"
                )
                .map((f) => (
                  <FieldWrapper
                    key={f.id}
                    label={f.label}
                    required={f.required}
                    className={
                      f.type === "textarea" ? "md:col-span-2" : ""
                    }
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
                        required={f.required}
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
                        required={f.required}
                        className="rounded-xl"
                      />
                    )}
                  </FieldWrapper>
                ))}
            </div>

            
            <div className="space-y-4">
              {fields
                .filter((f) => f.type === "rating")
                .map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl border bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        {q.label}
                        {q.required && (
                          <span className="text-red-500"> *</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        Emoji scale
                      </div>
                    </div>
                    <div className="mt-2">
                      <EmojiRating
                        value={ratings[q.id] || 0}
                        onChange={(v) =>
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

            
            <div className="flex items-center gap-2">
              <Button
                onClick={submit}
                disabled={isPending}
                className="rounded-full"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={() => {
                  setRatings({});
                  setValues({});
                }}
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
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
      <Label className="text-sm">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
