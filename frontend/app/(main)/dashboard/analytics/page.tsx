import AnalyticsClient from "@/components/dashboard/AnalyticsClient";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 border-b">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Analytics</h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <span>
              Operational insights, incident reduction, and system health
              metrics.
            </span>
          </div>
        </div>

        <div className="space-x-4">
          <Button className="ml-4" variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <AnalyticsClient />
    </div>
  );
}
