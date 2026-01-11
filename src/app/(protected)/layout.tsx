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

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const orgExists = await checkUserOrg(session.user.id);

  if (!orgExists) {
    redirect("/organization/details");
  }
  else{
    const formExists=  await checkOrgForm(session.user.id);
    if(!formExists){
      redirect("/organization/feedback-builder");
    }
  }

  return <>
    <div className="min-h-screen w-full h-screen overflow-hidden bg-[#E8EDEE] flex ">
      <Sidebar />
      <div className="w-[calc(100%-112px)]  relative h-full overflow-y-scroll">
        <Header />
        {children}
        
      </div>
    </div>
  </>;
}
