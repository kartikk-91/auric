"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface RatingQuestion {
  id: string;
  label: string;
  required: boolean;
}

export async function saveFeedbackForm(data: {
  formTitle: string;
  logoUrl: string;
  questions: RatingQuestion[];
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const company = await db.company.findUnique({
      where: { userId: session.user.id },
    });

    if (!company) {
      throw new Error("Company not found");
    }

   
    const schema = {
      title: data.formTitle,
      logoUrl: data.logoUrl,
      fields: [
       
        { id: "name", type: "text", label: "Name", required: true },
        { id: "state", type: "text", label: "State", required: true },
        { id: "country", type: "text", label: "Country", required: true },

       
        ...data.questions.map((q, index) => ({
          id: index === 0 ? "overall" : q.id,
          type: "rating",
          label: q.label,
          required: q.required,
        })),

       
        {
          id: "text",
          type: "textarea",
          label: "Feedback",
          required: true,
        },
      ],
    };

   
    await db.feedbackForm.upsert({
      where: { companyId: company.id },
      create: {
        companyId: company.id,
        title: data.formTitle,
        logoUrl: data.logoUrl,
        name: company.name,
        schema,
      },
      update: {
        title: data.formTitle,
        logoUrl: data.logoUrl,
        schema,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Error saving feedback form:", err);
    return { success: false, error: "Something went wrong" };
  }
}
