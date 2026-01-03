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
import { Shield, ShieldCheck } from "lucide-react";

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

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const responseData = await response.json();

      // Store token in localStorage
      localStorage.setItem("access_token", responseData.access_token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary/10 border border-primary flex flex-col items-center justify-center max-w-md w-full rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}

      <div
        className="mb-8 w-full p-4 border-b border-black pb-10 shadow-md"
        style={{
          background:
            "linear-gradient(0deg, #16212C 0%, rgba(21, 31, 43, 0) 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-secondary p-1 rounded">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">OpsGuard AI</span>
        </div>
      </div>
      <div className="w-full px-6 mb-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-10">
              {" "}
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome back
              </h1>
              <p className="text-gray-400">Log in to your SRE workspace</p>
            </div>
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email" className="text-gray-300">
                    Work Email
                  </Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@company.com"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between ">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-secondary hover:text-secondary/80 text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Log In Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Social Login Placeholder */}
        <Button
          variant="outline"
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-900"
          disabled
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15.5 1h-11C3.12 1 2 2.12 2 3.5v13C2 17.88 3.12 19 4.5 19h11c1.38 0 2.5-1.12 2.5-2.5v-13C18 2.12 16.88 1 15.5 1zm0 15h-11v-10h11v10zm-5.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 113 0z" />
          </svg>
          Coming soon
        </Button>

        {/* Footer */}
      </div>
      <div className="w-full px-6 py-5 bg-black border-t border-primary flex items-center justify-between text-sm rounded-b-2xl">
        <div className="flex items-center gap-1 ">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>SOC2 Type II</span>
        </div>
        <Link href="/help" className="text-gray-400 hover:text-gray-300">
          Need help?
        </Link>
      </div>
    </div>
  );
}
