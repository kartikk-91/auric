"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <div className="flex gap-4 w-full">
      <Button
        onClick={() => onClick("google")}
        variant="outline"
        className="w-1/2 text-[15px] py-5 rounded-xl cursor-pointer flex gap-2 items-center justify-center bg-white/40 border-white/50 backdrop-blur-md"
      >
        <Image src="/icons/google.svg" alt="google" width={20} height={20} />
        Google
      </Button>
      <Button
        onClick={() => onClick("github")}
        variant="outline"
        className="w-1/2 text-[15px] py-5 rounded-xl cursor-pointer flex gap-2 items-center justify-center bg-white/40 border-white/50 backdrop-blur-md"
      >
        <Image src="/icons/github.svg" alt="github" width={20} height={20} />
        GitHub
      </Button>
    </div>
  );
};

export default Social;