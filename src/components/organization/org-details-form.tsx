"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

import {
    validatePhoneNumber,
    validateUrl,
    validateRequired,
    validateMinLength,
    validateMaxLength,
} from "@/lib/validation";
import { addOrganisation } from "@/actions/add-organisation";
import { useRouter } from "next/navigation";

const InfoTooltip = ({ message }: { message: string }) => (
    <TooltipProvider delayDuration={200}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Info className="w-4 h-4 ml-2 text-muted-foreground cursor-pointer hover:text-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-sm">{message}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

type FormValues = {
    name: string;
    phoneNumber?: string;
    address: string;
    logoUrl?: string;
    description: string;
    website?: string;
};

const OrgDetailsForm = () => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
            logoUrl: "",
            description: "",
            website: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const { register, handleSubmit, setValue, formState: { errors } } = form;
    const router = useRouter();


    const onSubmit = async (values: FormValues) => {
        try {
            const result = await addOrganisation({
                name: values.name,
                phoneNumber: values.phoneNumber || undefined,
                address: values.address,
                logoUrl: values.logoUrl || undefined,
                description: values.description,
                website: values.website || undefined,
            });
            if (result.success) {
                router.push('/dashboard')
            }
        } catch {
            alert("Failed to add organization");
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            if (data.secure_url) {
                setLogoPreview(data.secure_url);
                setValue("logoUrl", data.secure_url);
            } else {
                alert("Upload failed. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong during upload.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center px-4 sm:px-6 md:px-8"
        >
            <Card className="w-full max-w-4xl h-fit p-4 sm:p-6 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-xl rounded-2xl border border-white/20">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <Image src="/auric.png" alt="auric" width={60} height={60} />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">Organization Details</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Let&apos;s get your organization set up — this will only take a couple of minutes.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Organization Name
                                            <InfoTooltip message="This name will be shown on your feedback wall and shared with customers for recognition." />
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Auric Technologies"
                                                {...field}
                                                {...register("name", {
                                                    validate: (value) =>
                                                        validateRequired(value, "Company name is required") === true
                                                            ? validateMinLength(value, 2) === true
                                                                ? validateMaxLength(value, 100)
                                                                : validateMinLength(value, 2)
                                                            : validateRequired(value, "Company name is required"),
                                                })}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.name?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                Phone Number
                                                <InfoTooltip message="We'll use this only for account verification or important communication. Never shared publicly." />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+1 234 567 8901"
                                                    {...field}
                                                    {...register("phoneNumber", {
                                                        validate: (value: string | undefined) =>
                                                            validatePhoneNumber(value ?? ""),
                                                    })}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.phoneNumber?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                Website
                                                <InfoTooltip message="Your website helps customers learn more about you — it may appear on widgets or embeds." />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://yourcompany.com"
                                                    {...field}
                                                    {...register("website", {
                                                        validate: (value: string | undefined) =>
                                                            validateUrl(value ?? ""),
                                                    })}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.website?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                Address
                                                <InfoTooltip message="Your address helps give context — max 200 characters." />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="1234 Main St, City, Country"
                                                    {...field}
                                                    {...register("address", {
                                                        validate: (value) =>
                                                            validateRequired(value, "Address is required") === true
                                                                ? validateMaxLength(value, 200)
                                                                : validateRequired(value, "Address is required"),
                                                    })}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.address?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormItem>
                                    <FormLabel className="flex items-center gap-1">
                                        Logo
                                        <InfoTooltip message="Upload a logo so your brand looks professional on walls, emails, and embeds." />
                                    </FormLabel>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-white/50 dark:bg-neutral-800/50 hover:bg-white/80 transition w-fit">
                                            <Upload className="w-4 h-4" />
                                            <span className="text-sm">Upload Logo</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                        </label>
                                        {logoPreview && (
                                            <Image src={logoPreview} alt="Logo Preview" width={60} height={60} className="rounded-lg border shadow-sm" />
                                        )}
                                    </div>
                                    <FormMessage>{errors.logoUrl?.message}</FormMessage>
                                </FormItem>
                            </div>


                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Description
                                            <InfoTooltip message="Tell us about your organization. Max 500 characters." />
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={4}
                                                placeholder="Tell us a bit about your organization..."
                                                {...field}
                                                {...register("description", {
                                                    validate: (value) =>
                                                        validateRequired(value, "Description is required") === true
                                                            ? validateMaxLength(value, 500)
                                                            : validateRequired(value, "Description is required"),
                                                })}
                                                className="rounded-xl max-h-36 min-h-36"
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.description?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="flex flex-col sm:flex-row justify-end sm:justify-between gap-4 pt-6">
                                <p className="text-xs text-muted-foreground text-center sm:text-left flex-1">
                                    You can always update these details later in your settings.
                                </p>
                                <Button type="submit" className="px-6 rounded-xl shadow-md hover:shadow-lg w-full sm:w-auto">
                                    Save Details
                                </Button>
                            </CardFooter>

                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default OrgDetailsForm;
