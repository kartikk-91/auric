"use client"
import { getFormDetails } from "@/actions/get-form-details"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { GradientBackground1, GradientBackground2 } from "@/components/landing/gradient-background"
import { useEffect, useState } from "react"
import type { JsonValue } from "@prisma/client/runtime/library";
import { RatingQuestion } from "@/app/organization/feedback-builder/page"


const FeedbackFormPage = () => {
    const [details, setDetails] = useState<{
        logoUrl: string | null;
        title: string | null;
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        schema: JsonValue;
        companyId: string;
    } | null | undefined>(undefined);

    const [companyId, setCompanyId] = useState<string | null>(null);

    useEffect(()=>{
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[2] || null;
        setCompanyId(id);
    },[])

    useEffect(()=>{
        async function fetchData(){
            if(!companyId) return;
            try {
                const result = await getFormDetails(companyId);
                if(result.success){
                    setDetails(result.details)
                    return;
                }
                alert("Error in fetching!")
            } catch {
                alert("Something went wrong!")
            }
        }
        fetchData()
    },[companyId])

    return (
        <div className="w-full py-16 min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f4f2f1] via-[#faf9f8] to-[#f4f2f100]" />
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#8a43e1]/20 blur-[160px]" />
            <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/20 blur-[160px]" />
            <GradientBackground1 />
            <GradientBackground2 />
            <div className="w-full max-w-7xl relative z-10 px-8 lg:px-0">
                <FeedbackForm
                    formTitle={details?.title || "auric"}
                    logoUrl={ details?.logoUrl ||"/auric.png"}
                    questions={Array.isArray(details?.schema) ? (details?.schema as RatingQuestion[]) : []}
                    companyId={companyId || ""}
                />
            </div>
        </div>
    )
}

export default FeedbackFormPage
