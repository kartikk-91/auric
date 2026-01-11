"use client"
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with different provider":"";


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error || "");
          setSuccess(data?.success || "");
        })
    });
  }
  
  return (
    <CardWrapper headerLabel={"Welcome back"} headerDesc={"Log in your account"} backButtonLabel="Don't have an account?" backButtonText={"Sign up"} backButtonHref='/auth/signup'
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className="w-full mb-4 text-[16px] cursor-pointer py-6 font-medium rounded-xl bg-gradient-to-r from-[#8a43e1] to-[#f59e0b] text-white">
            Login
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

export default LoginForm
