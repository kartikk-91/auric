"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Boxes,
  GripVertical,
  Plus,
  Save,
  Settings2,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreviewForm } from "@/components/organization/form-preview";
import { EmojiRating } from "@/components/organization/emoji-rating";
import Image from "next/image";
import { saveFeedbackForm } from "@/actions/add-org-form";


type BuiltInFieldKey = "name" | "state" | "country" | "text";

type BuiltInField = {
  key: BuiltInFieldKey;
  label: string;
  required: boolean;
};

export type RatingQuestion = {
  id: string;
  label: string;
  required: boolean;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const lockedBuiltIns: BuiltInField[] = [
  { key: "name", label: "Name", required: true },
  { key: "state", label: "State", required: true },
  { key: "country", label: "Country", required: true },
  { key: "text", label: "Feedback", required: true },
];


export const EMOJIS = ["😞", "😕", "😐", "🙂", "😃"];



function SortableQuestion({ q, onLabel, onRemove }: { q: RatingQuestion; onLabel: (v: string) => void; onRemove: () => void; }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: q.id });
  const style: React.CSSProperties = { transform: CSS.Translate.toString(transform), transition };
  return (
    <motion.div layout ref={setNodeRef} style={style} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
      className={`rounded-xl border bg-white p-3 shadow-sm ${isDragging ? "ring-2 ring-indigo-300" : ""}`}
    >
      <div className="grid grid-cols-[28px_1fr_auto] gap-3 items-center">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing select-none text-gray-500">
          <GripVertical className="h-5 w-5" />
        </div>
        <div>
          <Label>Question label</Label>
          <Input value={q.label} onChange={(e) => onLabel(e.target.value)} placeholder="e.g. How satisfied are you with support?" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-red-600" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Label className="text-xs text-gray-500">Preview</Label>
        <div className="mt-1"><EmojiRating /></div>
      </div>
    </motion.div>
  );
}

export default function AuricFeedbackFormBuilder() {
  const [questions, setQuestions] = useState<RatingQuestion[]>([
    { id: uid(), label: "Overall satisfaction", required: true },
  ]);
  const [formTitle, setFormTitle] = useState("Customer Feedback Form");
  const [logoUrl, setLogoUrl] = useState("/auric.png");
  const [logoPreview, setLogoPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [, setLoading] = useState(false);

  const canAdd = questions.length < 6;

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = questions.findIndex((x) => x.id === active.id);
    const newIdx = questions.findIndex((x) => x.id === over.id);
    setQuestions((q) => arrayMove(q, oldIdx, newIdx));
  }

  const addQuestion = () => {
    if (!canAdd) return;
    setQuestions((q) => [...q, { id: uid(), label: `Custom question ${q.length + 1}`, required: false }]);
  };

  const updateQuestion = (id: string, patch: Partial<RatingQuestion>) => {
    setQuestions((q) => q.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const removeQuestion = (id: string) => setQuestions((q) => q.filter((x) => x.id !== id));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setLogoPreview(data.secure_url);
        setLogoUrl(data.secure_url);
      } else {
        alert("Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await saveFeedbackForm({
        formTitle,
        logoUrl,
        questions,
      });
      if (res.success) {
        alert("Form saved successfully ✅");
      } else {
        alert(res.error || "Failed to save form ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f6f8fb] via-white to-[#eef2f7]">
  
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Boxes className="h-6 w-6 text-indigo-600" />
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600">
            Auric Form Builder
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button onClick={handleSave} className="rounded-full gap-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      </div>

   
      <div className="w-full mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="editor" className="">
          <TabsList className="grid grid-cols-2 w-full max-w-fit rounded-2xl bg-white/70 backdrop-blur shadow border mx-auto">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

  
          <TabsContent value="editor" asChild>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 max-w-7xl w-full mx-auto gap-6 mt-6"
            >
              <Card className="border-white/60 shadow-lg p-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5" /> Configure form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label>Form title</Label>
                        <Input
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="Customer Feedback Form"
                        />
                      </div>
                    

                  
                      <div className="sm:col-span-2">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logoUpload"
                          />
                          <label
                            htmlFor="logoUpload"
                            className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white shadow-sm hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4" />
                            {uploading ? "Uploading..." : "Upload Logo"}
                          </label>
                          {logoPreview && (
                            <Image
                              src={logoPreview}
                              alt="Logo Preview"
                              width={10}
                              height={10}
                              className="h-10 w-10 rounded border"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700">
                        Built-in fields (locked)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lockedBuiltIns.map((f) => (
                          <div
                            key={f.key}
                            className="rounded-xl border bg-white p-3 shadow-sm"
                          >
                            <div className="text-sm font-semibold">
                              {f.label} <span className="text-red-500">*</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              key: <code>{f.key}</code> · required
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                 
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">
                          Custom rating questions (max 6)
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full"
                          onClick={addQuestion}
                          disabled={!canAdd}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add question
                        </Button>
                      </div>

                      <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={onDragEnd}
                      >
                        <SortableContext
                          items={questions.map((q) => q.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-3">
                            <AnimatePresence initial={false}>
                              {questions.map((q) => (
                                <SortableQuestion
                                  key={q.id}
                                  q={q}
                                  onLabel={(v) =>
                                    updateQuestion(q.id, { label: v })
                                  }
                                  onRemove={() => removeQuestion(q.id)}
                                />
                              ))}
                            </AnimatePresence>
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="preview" asChild>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <PreviewForm
                formTitle={formTitle}
                logoUrl={logoUrl}
                questions={questions}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>


      <div className="pointer-events-none select-none fixed bottom-3 right-4 z-40 text-[11px] tracking-widest uppercase">
        <span className="px-2 py-1 rounded-full bg-white/70 border shadow-sm backdrop-blur-md">
          powered by <b>auric</b>
        </span>
      </div>
    </div>
  );
}



