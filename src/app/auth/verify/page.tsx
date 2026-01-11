"use client";
import VerificationForm from "@/components/auth/verification-form";
import {
  GradientBackground1,
  GradientBackground2,
} from "@/components/landing/gradient-background";
import React, { Suspense } from "react";

const VerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f2f1] via-[#faf9f8] to-[#f4f2f100]" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#8a43e1]/20 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/20 blur-[160px]" />
        <GradientBackground1 />
        <GradientBackground2 />

        <div className="w-full min-h-screen flex items-center justify-center relative z-10 px-4">
          <VerificationForm />
        </div>
      </div>
    </Suspense>
  );
};

export default VerificationPage;
