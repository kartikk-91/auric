"use server";

import { db } from "@/lib/db"; 


export async function getFormDetails(id:string) {
  try {
    const details= await db.feedbackForm.findUnique({
        where:{
            companyId: id,
        }
    })
    return { details ,success: true };

  } catch (err) {
    console.error("Error saving feedback form:", err);
    return { success: false, error: "Something went wrong" };
  }
}
