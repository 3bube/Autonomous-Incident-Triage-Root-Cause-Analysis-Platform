import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-background">
      <LoginForm />

      <div className="space-y-4">
        <div className="text-center text-sm text-[#92adc9]">
          Already have an account?{" "}
          <Link
            href="/signup"
            className="text-secondary hover:text-secondary/80"
          >
            Sign up
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
      </div>
    </div>
  );
}
