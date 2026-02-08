"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, Send, Square, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";



const formatTime = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

async function mockAIResponse(prompt: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));
  return `Here’s a refined answer to:

"${prompt}"

• Insight: simplify the experience
• Action: reduce friction
• Tip: iterate with user feedback`;
}

type Role = "user" | "assistant";

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
        "👋 Hi, I’m **AuricBot**.\nAsk me anything about your feedback or testimonials.",
      time: formatTime(new Date()),
    },
  ]);

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const isStreamingRef = useRef(false);

  

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isStreaming]);

  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  

  const stopStream = () => setIsStreaming(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      time: formatTime(new Date()),
    };

    setMessages((p) => [...p, userMsg]);
    setIsStreaming(true);

    const assistantId = crypto.randomUUID();
    setMessages((p) => [
      ...p,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        time: formatTime(new Date()),
      },
    ]);

    const full = await mockAIResponse(text);
    const chars = full.split("");
    let i = 0;

    const stream = () => {
      if (!isStreamingRef.current) return;

      if (i >= chars.length) {
        setIsStreaming(false);
        return;
      }

      setMessages((p) =>
        p.map((m) =>
          m.id === assistantId
            ? { ...m, content: m.content + chars[i] }
            : m
        )
      );

      i++;
      setTimeout(stream, 14);
    };

    stream();
  };

  

  return (
    <div className="min-h-[100dvh] flex flex-col bg-neutral-50 font-sans">

            <header className="sticky top-0 z-20 bg-white border-b">
        <div className="flex items-center gap-2 px-4 py-3 max-w-3xl mx-auto">
          <Bot className="h-5 w-5 text-indigo-600" />
          <span className="font-semibold text-base">AuricBot</span>
          <Badge variant="secondary">Lite</Badge>
        </div>
      </header>

            <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 pt-6 pb-32 space-y-4 max-w-3xl mx-auto w-full"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex gap-3",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "assistant" && (
                <Avatar className="h-7 w-7 mt-1 shrink-0">
                  <AvatarImage src="/bot.png" />
                  <AvatarFallback className="bg-indigo-100">
                    <Bot className="h-4 w-4 text-indigo-600" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="group max-w-[75%]">
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "assistant"
                      ? "bg-white border text-neutral-800"
                      : "bg-indigo-600 text-white"
                  )}
                >
                  {m.content}
                </div>

                <div className="mt-1 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition">
                  {m.time}
                </div>
              </div>

              {m.role === "user" && (
                <Avatar className="h-7 w-7 mt-1 shrink-0">
                  <AvatarImage src="/user.png" />
                  <AvatarFallback className="bg-neutral-900 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isStreaming && (
          <div className="flex items-center gap-2 text-xs text-neutral-500 px-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            AuricBot is typing…
          </div>
        )}
      </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-3 py-2 z-30">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <Textarea
            placeholder="Ask AuricBot anything…"
            className="resize-none min-h-[44px] max-h-28 text-sm leading-relaxed"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {!isStreaming ? (
            <Button
              onClick={handleSend}
              className="h-10 px-4 rounded-xl shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={stopStream}
              variant="destructive"
              className="h-10 px-4 rounded-xl shrink-0"
            >
              <Square className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
