import { checkUserOrg } from "@/actions/check-org";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface OrganisationLayoutProps {
  children: ReactNode;
}

export default async function OrganisationLayout({ children }: OrganisationLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const orgExists = await checkUserOrg(session.user.id);

  if (orgExists) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
