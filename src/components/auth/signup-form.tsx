"use client"
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams } from 'next/navigation'

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with different provider":"";

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error || "");
          setSuccess(data.success || "");
        })
    });
  }
  const checkStrength = (value: string) => {
    if (!value) return setPasswordStrength("");
    let strength = 0;
    if (value.length >= 6) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    if (strength <= 1) setPasswordStrength("Weak");
    else if (strength === 2) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  return (
    <CardWrapper headerLabel={"Welcome back"} headerDesc={"Let's set up your account"} backButtonLabel="Already have an account?" backButtonText={"Sign in"} backButtonHref='/auth/login'
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-800">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Enter your name"
                      className="mt-1 bg-white/40 border-white/50 pr-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-800">Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Enter your email"
                      type='email'
                      className="mt-1 bg-white/40 border-white/50 pr-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-800">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="mt-1 bg-white/40 border-white/50 pr-10"
                        onChange={(e) => {
                          field.onChange(e);
                          checkStrength(e.target.value);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  {passwordStrength && (
                    <div className="mt-2 w-full h-2 rounded bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength === "Weak"
                          ? "bg-red-500 w-1/3"
                          : passwordStrength === "Medium"
                            ? "bg-yellow-500 w-2/3"
                            : "bg-green-600 w-full"
                          }`}
                      />
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-800">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Re-enter your password"
                        type={showConfirmPassword ? "text" : "password"}
                        className="mt-1 bg-white/40 border-white/50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className="w-full mb-4 text-[16px] cursor-pointer py-6 font-medium rounded-xl bg-gradient-to-r from-[#8a43e1] to-[#f59e0b] text-white">
            Register
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-2 text-gray-600">
        <div className="flex-1 h-[1px] bg-gray-300/40"></div>
        <span className="text-sm">or continue with</span>
        <div className="flex-1 h-[1px] bg-gray-300/40"></div>
      </div>
    </CardWrapper>
  )
}

export default SignupForm
