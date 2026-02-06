import { db } from "@/lib/db";
import { PublicFeedbackForm } from "@/components/public-feedback-form";

export default async function Page({
  params,
}: {
  params: { companyId: string };
}) {
  const form = await db.feedbackForm.findUnique({
    where: { companyId: params.companyId },
  });

  if (!form) return <div>Form not found</div>;

  return (
    <PublicFeedbackForm
      companyId={params.companyId}
      schema={form.schema}
    />
  );
}
