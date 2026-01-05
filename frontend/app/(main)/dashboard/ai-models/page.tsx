import AIModelClient from "@/components/dashboard/AIModelClient";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 border-b">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            System Health & Performance
          </h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <span>
              Real-time telemetry on active AI models. Monitor drift, retraining
              cycles, and correlation accuracy.
            </span>
          </div>
        </div>

        <div className="space-x-4">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>

          <Button className="ml-4" variant="secondary">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retrain model
          </Button>
        </div>
      </div>

      <AIModelClient />
    </div>
  );
}
