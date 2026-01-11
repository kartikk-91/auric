"use client";

import React, { useEffect,useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Copy,
  FileText,
  Loader2,
  Mic,
  RefreshCcw,
  Send,
  Square,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);


async function mockAIResponse(prompt: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1200));
  const canned: Record<string, string> = {
    summarize:
      "Here's a concise summary of recent feedback: users love the performance bump, ask for better onboarding, and want quicker support SLAs.",
    pain:
      "Top pain points: 1) Delayed support responses 2) Confusing setup for new teams 3) Occasional sync lag in integrations.",
    release:
      "Release notes draft: Added faster search, improved session reliability, and new region filters. Addressed onboarding with guided tours.",
    plan:
      "Action plan: 1) Staff weekend support 2) Add 90-sec setup video 3) SLA alerts for triage 4) Monthly feedback review with PMs.",
  };
  const p = prompt.toLowerCase();
  if (p.includes("pain")) return canned.pain;
  if (p.includes("release")) return canned.release;
  if (p.includes("action")) return canned.plan;
  if (p.includes("summary") || p.includes("summarize")) return canned.summarize;
  return `Got it. Here's a thoughtful take: ${prompt}\n\n• Key insight: focus efforts where sentiment dips.\n• Next step: create a small experiment and measure uplift.\n• Tip: reuse positive quotes in hero section.`;
}


type Role = "user" | "assistant" | "system";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  time: string;
};

export default function AskAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "👋 I'm **VisionBot**. Ask me anything about your testimonials — I can summarize, find themes, and suggest next steps.",
      time: formatDate(new Date()),
    },
  ]);

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [temperature, ] = useState<number>(7); 
  const [attached, setAttached] = useState<File[]>([]);

  const scrollerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
  
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const el = document.getElementById("chat-input");
        (el as HTMLTextAreaElement | null)?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });


  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

 
  const removeAttachment = (idx: number) => {
    setAttached((files) => files.filter((_, i) => i !== idx));
  };

  const stopStream = () => setIsStreaming(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      time: formatDate(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);


    const assistantId = crypto.randomUUID();
    const assistantStart: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      time: formatDate(new Date()),
    };
    setMessages((prev) => [...prev, assistantStart]);

    const full = await mockAIResponse(text);
    const tokens = full.split("");

    let idx = 0;
    const step = () => {
      if (!isStreamingRef.current) return; 
      if (idx >= tokens.length) {
        setIsStreaming(false);
        return;
      }
      const chunk = tokens[idx];
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
      );
      idx++;
      setTimeout(step, 10 + Math.random() * 20 - temperature); 
    };
    step();
  };

  const isStreamingRef = useRef(isStreaming);
  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  const gradientBorder = "bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400";

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen w-full pt-16 bg-[#E8EDEE] relative overflow-hidden">
        <div className=" z-40 backdrop-blur-xl border-b">
          <div className="mx-auto px-6 sm:px-6 py-3 flex items-center gap-3">
            <Bot className="h-6 w-6 text-indigo-600" />
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600">
              VisionBot
            </div>
            <Badge variant="secondary" className="ml-2 rounded-full">Lite</Badge>
          </div>
        </div>
        <div className="mx-auto px-4 sm:px-6 py-6 grid grid-cols-1  gap-6">
          
          <div className="flex flex-col h-[calc(100vh-160px)]">
            <Card className="flex-1 overflow-hidden shadow-sm border-white/60">
              <div ref={scrollerRef} className="h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "assistant" && (
                        <Avatar className="h-8 w-8 mt-1 shadow">
                          <AvatarImage src="/bot.png" alt="bot" />
                          <AvatarFallback className="bg-indigo-100 text-indigo-700"><Bot className="h-4 w-4"/></AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`max-w-[92%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow ${m.role === "assistant" ? "bg-white border" : "bg-gradient-to-r from-indigo-500 to-emerald-500 text-white"}`}>
                        <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                          {m.content}
                        </div>
                        <div className={`mt-2 text-[11px] ${m.role === "assistant" ? "text-gray-500" : "text-white/80"}`}>{m.time}</div>
                        <div className="mt-2 flex items-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant={m.role === "assistant" ? "ghost" : "secondary"} size="icon" className="h-7 w-7 rounded-full" onClick={() => handleCopy(m.content)}>
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant={m.role === "assistant" ? "ghost" : "secondary"} size="icon" className="h-7 w-7 rounded-full" onClick={() => setInput(m.content)}>
                                <RefreshCcw className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Use as prompt</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {m.role === "user" && (
                        <Avatar className="h-8 w-8 mt-1 shadow">
                          <AvatarImage src="/user.png" alt="you" />
                          <AvatarFallback className="bg-gray-900 text-white"><User className="h-4 w-4"/></AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <AnimatePresence>
                  {isStreaming && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" /> VisionBot is thinking…
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
            
            {attached.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {attached.map((f, i) => (
                  <Badge key={i} variant="secondary" className="rounded-full gap-2">
                    <FileText className="h-3.5 w-3.5" /> {f.name}
                    <button onClick={() => removeAttachment(i)} className="ml-1"><Trash2 className="h-3.5 w-3.5"/></button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-4">
              <div className={`rounded-2xl p-[1px] ${gradientBorder} shadow-lg`}>
                <div className="rounded-2xl bg-white border flex items-end gap-2 p-2">
                  <Textarea
                    id="chat-input"
                    placeholder="Ask anything… (Shift+Enter = newline)"
                    className="min-h-[56px] max-h-40 resize-none border-0 focus-visible:ring-0 shadow-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />

                  <div className="flex items-center gap-1 pb-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Mic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Voice (coming soon)</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="h-6" />

                    {!isStreaming ? (
                      <Button onClick={handleSend} className="rounded-full px-4 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">
                        <Send className="h-4 w-4 mr-2" /> Send
                      </Button>
                    ) : (
                      <Button onClick={stopStream} variant="destructive" className="rounded-full px-4">
                        <Square className="h-4 w-4 mr-2" /> Stop
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setMessages([])}>
                  <Trash2 className="h-4 w-4 mr-1"/> Clear chat
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setInput("Summarize my latest user feedback")}>Try a prompt</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
