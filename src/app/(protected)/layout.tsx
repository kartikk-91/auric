import { checkUserOrg } from "@/actions/check-org";
import { checkOrgForm } from "@/actions/check-org-form";
import { auth } from "@/auth";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await auth();

  if (!session) redirect("/auth/login");

  const orgExists = await checkUserOrg(session.user.id);
  if (!orgExists) redirect("/organization/details");

  const formExists = await checkOrgForm(session.user.id);
  if (!formExists) redirect("/organization/feedback-builder");

  return (
    <div className="min-h-screen w-full bg-[#E8EDEE] flex">
      
      <Sidebar />

      
      <div className="flex-1 relative w-full  h-screen overflow-y-auto">
        <Header />
        <main className="pt-4">{children}</main>
      </div>
    </div>
  );
}
