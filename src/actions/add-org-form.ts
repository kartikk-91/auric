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
        throw new Error("User ID is required to create a company.");
    }

    const company = await db.company.findUnique({
        where: {
            userId: session?.user?.id,
        }
    });
    if (!company?.id) {
        throw new Error("Company not found for this user.");
    }
    await db.feedbackForm.create({
      data: {
        title: data.formTitle,
        logoUrl: data.logoUrl,
        schema: JSON.parse(JSON.stringify(data.questions)),
        name: company.name,
        companyId: company.id,
      },
    });

    return { success: true };

  } catch (err) {
    console.error("Error saving feedback form:", err);
    return { success: false, error: "Something went wrong" };
  }
}
