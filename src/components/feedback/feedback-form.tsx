"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RatingQuestion } from "@/app/organization/feedback-builder/page";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { Label } from "../ui/label";
import { EmojiRating } from "../organization/emoji-rating";
import { useState } from "react";
import { saveFeedback } from "@/actions/save-feedback";

interface FeedbackFormProps {
  formTitle: string;
  logoUrl: string;
  companyId: string; 
  questions: RatingQuestion[];
  compact?: boolean;
}

export function FeedbackForm({ formTitle, logoUrl, companyId, questions, compact }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [ratings, setRatings] = useState<{ [id: string]: number }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const feedbackData = {
      name,
      state,
      country,
      text: feedbackText,
      questions: questions.map((q) => ({
        id: q.id,
        label: q.label,
        rating: ratings[q.id] ?? null,
      })),
      companyId,
    };

    try {
      await saveFeedback(feedbackData)
      alert("Feedback submitted successfully!");
      setName("");
      setState("");
      setCountry("");
      setFeedbackText("");
      setRatings({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting feedback.");
    }
  };

  const handleRatingChange = (id: string, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`relative mx-auto ${compact ? "max-w-2xl" : "max-w-4xl"}`}>
      <div className="relative border shadow-2xl rounded-3xl overflow-hidden 
                  bg-white/30 backdrop-blur-lg">
        <div className="absolute inset-x-0 -top-12 h-24 blur-2xl opacity-70 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400" />
        <div className="absolute inset-x-0 -top-12 h-24 blur-2xl opacity-70 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400" />

        <div className="px-6 md:px-10 pt-10 pb-8">
          <div className="flex flex-col items-center gap-3">
            <Image src={logoUrl} alt="Company Logo" width={100} height={100} className="h-16 w-16 rounded-xl object-cover shadow" />
            <div className="text-2xl font-bold text-gray-800 text-center">{formTitle}</div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded-xl" required />
              </Field>
              <Field label="State" required>
                <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="Your state" className="rounded-xl" required />
              </Field>
              <Field label="Country" required>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Your country" className="rounded-xl" required />
              </Field>
              <Field label="Feedback" required className="md:col-span-2">
                <Textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Write your feedback..." className="rounded-xl" required />
              </Field>
            </div>

            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="rounded-xl border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{q.label}{q.required && <span className="text-red-500"> *</span>}</div>
                  </div>
                  <div className="mt-2">
                    <EmojiRating onSelect={(value) => handleRatingChange(q.id, value + 1)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-5 py-2 font-medium border border-gray-300 
               hover:bg-gray-100 hover:text-gray-700 
               text-gray-600 flex items-center gap-2 transition-all"
                onClick={() => {
                  setName("");
                  setState("");
                  setCountry("");
                  setFeedbackText("");
                  setRatings({});
                }}
              >
                <RefreshCcw className="h-4 w-4" /> Reset
              </Button>

              <Button
                type="submit"
                className="rounded-full px-6 py-2 font-medium shadow-md 
               bg-gradient-to-r from-indigo-500 to-emerald-500 
               hover:from-indigo-600 hover:to-emerald-600 
               text-white transition-all duration-200"
              >
                Submit
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children, className = "" }: { label: string; required?: boolean; children: React.ReactNode; className?: string; }) {
  return (
    <div className={className}>
      <Label className="text-sm">{label}{required && <span className="text-red-500"> *</span>}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
