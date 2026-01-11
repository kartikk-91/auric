"use server";

import { db } from "@/lib/db";


export async function checkOrgForm(userId: string) {
    console.log("userId: ", userId);

    const company = await db.company.findUnique({
        where: { userId },
        select: { feedbackForm: { select: { id: true } } },
    });

    return company?.feedbackForm ? true : false;
}