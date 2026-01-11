import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RatingQuestion } from "@/app/organization/feedback-builder/page";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { Label } from "../ui/label";
import { EmojiRating } from "./emoji-rating";




export function PreviewForm({ formTitle, logoUrl, questions, compact }: { formTitle: string; logoUrl: string; questions: RatingQuestion[]; compact?: boolean; }) {
    return (
      <div className={`relative mx-auto ${compact ? "max-w-2xl" : "max-w-4xl"}`}>
        <div className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border shadow-2xl rounded-3xl overflow-hidden">
        
          <div className="absolute inset-x-0 -top-12 h-24 blur-2xl opacity-70 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"/>
  
          <div className="px-6 md:px-10 pt-10 pb-8">
            <div className="flex flex-col items-center gap-3">
              <Image src={logoUrl} alt="Company Logo" width={100} height={100} className="h-16 w-16 rounded-xl object-cover shadow" />
              <div className="text-2xl font-bold text-gray-800 text-center">{formTitle}</div>
              <div className="text-sm text-gray-600">{"Organisation name"}</div>
            </div>
  
            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" required><Input placeholder="Your name" className="rounded-xl" required /></Field>
                <Field label="State" required><Input placeholder="Your state" className="rounded-xl" required /></Field>
                <Field label="Country" required><Input placeholder="Your country" className="rounded-xl" required /></Field>
                <Field label="Feedback" required className="md:col-span-2"><Textarea placeholder="Write your feedback..." className="rounded-xl" required /></Field>
              </div>
  
           
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="rounded-xl border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{q.label}{q.required && <span className="text-red-500"> *</span>}</div>
                      <div className="text-xs text-gray-500">Emoji scale</div>
                    </div>
                    <div className="mt-2"><EmojiRating /></div>
                  </div>
                ))}
              </div>
  
              <div className="flex items-center gap-2">
                <Button disabled className="rounded-full">Submit</Button>
                <Button type="button" variant="ghost" className="rounded-full"><RefreshCcw className="h-4 w-4 mr-1"/> Reset</Button>
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