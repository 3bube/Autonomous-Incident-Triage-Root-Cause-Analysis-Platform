import { type ReactNode } from "react";
import { QueryClientProvider } from "@/context/QueryClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
}

export default Providers;
