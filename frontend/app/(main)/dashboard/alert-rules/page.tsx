import AlertRuleClient from "@/components/dashboard/AlertRuleClient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 border-b">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Alert Rules</h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <span>
              Manage alert suppression, routing logic, and notification
              preferences to reduce noise and improve response times.
            </span>
          </div>
        </div>

        <Button className="ml-4" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Create Rule
        </Button>
      </div>

      <AlertRuleClient />
    </div>
  );
}
