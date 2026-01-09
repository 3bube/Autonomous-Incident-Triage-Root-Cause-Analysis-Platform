import { Button } from "@/components/ui/button";
import { Edit2, Bot, Clock, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between space-x-4 border-b pb-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">
            Incident Details
          </h1>

          <div className="flex items-center gap-2 text-md mb-6">
            <Clock className="h-4 w-4 text-gray-400" />
            <span> Started 24m ago</span>
            <div className="flex items-center gap-2 mb-2"></div>
            <Server className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400"> Incident ID:</span>
            <Badge className="bg-[#2b8cee] text-white font-medium">{id}</Badge>
          </div>
          <span className="text-gray-400">Status: Investigating</span>
        </div>

        <div className="space-x-4">
          <Button>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button className="ml-4" variant="secondary">
            <Bot className="mr-2 h-4 w-4" />
            Run Auto-Remediation
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-4">
            Timeline & Telemetry
          </h2>
          <p className="text-gray-400">
            Logs, metrics, traces, and events for incident {id} will appear
            here.
          </p>
        </div>
      </div>
    </div>
  );
}
