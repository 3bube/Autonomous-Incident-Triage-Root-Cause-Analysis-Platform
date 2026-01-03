"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Github, Info, ShieldCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Name is required"),
    company: z.string().min(2, "Company is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    agree: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: true,
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          company: values.company,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Sign up failed");
      }

      const data = await response.json().catch(() => ({}));

      if (data?.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-[#19263366] border border-[#233648] flex flex-col items-center justify-center w-full max-w-[440px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="w-full px-6 pb-8 pt-6">
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="fullName"
                    className="text-white text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <FormControl>
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="email"
                    className="text-white text-sm font-medium"
                  >
                    Work Email
                  </Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9]"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-[#92adc9] mt-2 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-[2px]" />
                    Your organization role (RBAC) will be assigned automatically
                    based on your email domain.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9] pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] hover:text-white"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter password"
                        className="h-12 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#92adc9] pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      aria-label="Toggle confirm password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#92adc9] hover:text-white"
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3 text-sm text-[#92adc9]">
                    <input
                      id="agree"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-[#324d67] bg-[#192633] text-secondary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <Label htmlFor="agree" className="text-[#92adc9]">
                      I agree to the
                      <Link
                        href="/terms"
                        className="text-secondary hover:text-secondary/80 ml-1"
                      >
                        Terms of Service
                      </Link>
                      <span className="mx-1">and</span>
                      <Link
                        href="/privacy"
                        className="text-secondary hover:text-secondary/80"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#2b8cee] hover:bg-[#58a8f5] text-white font-semibold text-base rounded-lg shadow-[0px_10px_15px_-3px_rgba(43,140,238,0.2),0px_4px_6px_-4px_rgba(43,140,238,0.2)]"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="flex items-center w-full justify-center">
              <div className="flex-1 h-px bg-[#324d67]" />
              <span className="px-3 text-sm text-[#92adc9] bg-[#16212c]">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-[#324d67]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 bg-[#192633] border border-[#324d67] text-white hover:bg-[#1f2f3f] flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 bg-[#192633] border border-[#324d67] text-white hover:bg-[#1f2f3f] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6 10.23c0-.64-.06-1.25-.18-1.84H10v3.48h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24a9.7 9.7 0 0 0 2.97-7.16Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.24-2.5c-.9.6-2.06.96-3.37.96-2.6 0-4.8-1.76-5.59-4.13H1.08v2.6A10 10 0 0 0 10 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.41 11.89a6 6 0 0 1 0-3.78V5.5H1.08a10 10 0 0 0 0 9.02l3.33-2.63Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10 4.04c1.47 0 2.8.5 3.84 1.5l2.88-2.88C14.95.98 12.7 0 10 0A10 10 0 0 0 1.08 5.5L4.4 8.11C5.2 5.74 7.4 4.04 10 4.04Z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="text-center text-sm text-[#92adc9]">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-secondary hover:text-secondary/80"
              >
                Log in
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-[#637d94]">
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
