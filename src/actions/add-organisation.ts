"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function addOrganisation(data: {
    name: string;
    phoneNumber?: string;
    address: string;
    logoUrl?: string;
    description: string;
    website?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error("User ID is required to create a company.");
        }
        const company = await db.company.create({
            data: {
                userId: session.user.id,
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                logoUrl: data.logoUrl,
                description: data.description,
                website: data.website,
            },
        });
        if(company){
            await db.user.update({
                where: {id: session.user.id},
                data:{
                    companyAdded: true,
                }
            })
        }

        return {
            success: "Organization created successfully"
        }
    } catch {
        throw new Error("Failed to add company");
    }
}
