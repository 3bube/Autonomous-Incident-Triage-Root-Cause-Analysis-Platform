import SignUpForm from "@/components/auth/SignUpForm";

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[45%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(43,140,238,0.05)] blur-[60px]" />
        <div className="absolute right-[20%] top-[55%] h-[360px] w-[360px] rounded-full bg-[rgba(99,102,241,0.1)] blur-[70px]" />
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center w-full max-w-[640px]">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-10 text-white">
            Start Resolving Incidents Faster
          </h1>
          <p className="text-sm text-[#92adc9]">
            Create your account to visualize production health and reduce alert
            fatigue.
          </p>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
