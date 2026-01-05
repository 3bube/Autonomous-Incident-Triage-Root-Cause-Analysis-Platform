import { Button } from "@/components/ui/button";
import { History, Plus } from "lucide-react";
import IntegrationClient from "@/components/dashboard/IntegrationClient";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 border-b">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Integrations</h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <span>
              Manage external data sources, configure AI correlation rules, and
              define team access policies for your observability stack.
            </span>
          </div>
        </div>

        <div className="space-x-4">
          <Button>
            <History className="mr-2 h-4 w-4" />
            Audit Logs
          </Button>

          <Button className="ml-4" variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Add New Integration
          </Button>
        </div>
      </div>

      <IntegrationClient />
    </div>
  );
}
