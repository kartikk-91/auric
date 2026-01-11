"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerDesc: string;
    backButtonLabel: string;
    backButtonText: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    headerDesc,
    backButtonLabel,
    backButtonText,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="backdrop-blur-xl bg-white/25 border border-white/30 rounded-3xl w-full max-w-md p-8 flex flex-col gap-6 shadow-lg shadow-black/5">
            <CardHeader>
                <Header label={headerLabel} desc={headerDesc} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>

            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} linkText={backButtonText} />
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;