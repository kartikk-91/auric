"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EMOJIS } from "@/app/organization/feedback-builder/page";

export function EmojiRating({ onSelect }: { onSelect?: (i: number) => void }) {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div
      className="
        flex items-center gap-2 sm:gap-3
        overflow-x-auto
        h-18
        no-scrollbar
        -mx-1 px-1
      "
    >
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
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.94 }}
            className={`
              flex-shrink-0
              rounded-xl transition
              flex items-center justify-center
              
              text-xl sm:text-2xl md:text-3xl
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14

              ${
                active
                  ? "bg-indigo-100 ring-2 ring-indigo-300"
                  : "hover:bg-gray-100"
              }
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
