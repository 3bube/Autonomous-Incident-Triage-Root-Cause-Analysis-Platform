import DashboardClient from "@/components/dashboard/DashboardClient";
import { Button } from "@/components/ui/button";
import { History, BellPlus } from "lucide-react";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 ">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Incidents Overview
          </h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
            <span>Real-time production health and correlation.</span>
          </div>
        </div>

        <div className="space-x-4">
          <Button>
            <History className="mr-2 h-4 w-4" />
            View Logs
          </Button>

          <Button className="ml-4" variant="secondary">
            <BellPlus className="mr-2 h-4 w-4" />
            Create Incident
          </Button>
        </div>
      </div>
      <DashboardClient />
    </div>
  );
}
