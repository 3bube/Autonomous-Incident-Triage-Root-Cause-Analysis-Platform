"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { authService } from "@/services/auth.service";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    console.log("Submitting login form with values:", data);

    try {
      const response = await authService.login(data.email, data.password);

      console.log(response);
      // router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#16212c] border border-[#324d67] flex flex-col max-w-110 w-110 rounded-xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Header with background */}
      <div className="h-32 bg-linear-to-b from-[#16212c] to-[#16212c] relative border-b border-black">
        <div className="absolute inset-0 bg-linear-to-b from-[#16212c] to-transparent" />
        <div className="relative flex gap-2 items-center p-4 top-4 left-4">
          <div className="bg-[#2b8cee] p-1.5 rounded-lg flex items-center justify-center size-8">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 20 24"
              fill="currentColor"
            >
              <path d="M10 2C5.58 2 2 5.58 2 10v10h16V10c0-4.42-3.58-8-8-8zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 10c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
            </svg>
          </div>
          <h2 className="text-white font-bold text-lg leading-7">
            OpsGuard AI
          </h2>
        </div>
      </div>

      <div className="w-full px-8 pt-2 pb-12">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white leading-8 -tracking-[0.6px]">
                Welcome back
              </h1>
              <p className="text-[#92adc9] text-sm leading-5">
                Log in to your SRE workspace
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="email"
                    className="text-[#e2e8f0] text-sm font-medium"
                  >
                    Work Email
                  </Label>
                  <div className="relative mt-2">
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@company.com"
                        className="h-11 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#6b7280] rounded-lg pl-10 pr-4"
                        {...field}
                      />
                    </FormControl>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-[#e2e8f0] text-sm font-medium"
                    >
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-[#2b8cee] hover:text-[#58a8f5] text-xs font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-2">
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-11 bg-[#192633] border border-[#324d67] text-white placeholder:text-[#6b7280] rounded-lg pl-10 pr-4"
                        {...field}
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-[#2b8cee] hover:bg-[#58a8f5] text-white font-semibold text-sm rounded-lg shadow-[0px_10px_15px_-3px_rgba(59,130,246,0.2),0px_4px_6px_-4px_rgba(59,130,246,0.2)]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-[#324d67]"></div>
          <span className="text-[#94a3b8] text-xs font-medium uppercase">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-[#324d67]"></div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 bg-[#192633] border border-[#324d67] text-white hover:bg-[#1f2f3f] rounded-lg"
          disabled
        >
          Coming Soon
        </Button>
      </div>

      <div className="w-full px-8 py-4 bg-[#0c141c] border-t border-[#324d67] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
          <span className="text-[#94a3b8]">SOC2 Type II</span>
        </div>
        <Link href="/help" className="text-[#94a3b8] hover:text-white">
          Need help?
        </Link>
      </div>
    </div>
  );
}
