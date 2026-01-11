"use client";
import { useSearchParams } from "next/navigation"
import CardWrapper from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { verifyEmail } from "@/actions/verify-email";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";


const VerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token!");
            return;
        }

        verifyEmail(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (
        <CardWrapper
            headerLabel="Verify Email"
            headerDesc="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            backButtonText="Log In"
        >
            <div className="flex mb-4 gap-4 flex-col items-center w-full justify-center">
                {
                    !success && !error && (
                        <BeatLoader />
                    )
                }
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
            
        </CardWrapper>
    )
}

export default VerificationForm
