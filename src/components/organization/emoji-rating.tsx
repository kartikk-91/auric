"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EMOJIS } from "@/app/organization/feedback-builder/page";

export function EmojiRating({ onSelect }: { onSelect?: (i: number) => void }) {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
      {EMOJIS.map((e, i) => {
        const active = value === i;
        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => {
              setValue(i);
              onSelect?.(i);
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`
              text-2xl sm:text-3xl md:text-4xl
              leading-none rounded-xl transition
              px-3 py-2 sm:px-4 sm:py-2.5
              ${active ? "bg-gradient-to-r from-indigo-100 to-emerald-100 ring-2 ring-indigo-300" : "hover:bg-gray-100"}
              flex items-center justify-center
              min-w-[40px] sm:min-w-[50px]
            `}
            aria-label={`Select ${e}`}
          >
            {e}
          </motion.button>
        );
      })}
    </div>
  );
}
