"use client";

import { testQueue } from "@/actions/test-queue";
import { createTestFeedback } from "@/actions/create-test-feedback";
import { useTransition } from "react";

export default function TestButton() {
    const [isPending, startTransition] = useTransition();
    const [isPending1, startTransition1] = useTransition();
    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-[100vh]">
            <button
                onClick={() =>
                    startTransition1(async () => {
                        const res = await createTestFeedback();
                        console.log("Created feedback:", res.feedbackId);
                    })
                }
                disabled={isPending1}
            >
                {isPending ? "Creating..." : "Create Test Feedback"}
            </button>
            <button
                onClick={() =>
                    startTransition(() => {
                        testQueue();
                    })
                }
                disabled={isPending}
            >
                {isPending ? "Sending..." : "Send test job"}
            </button>
        </div>
    );
}



