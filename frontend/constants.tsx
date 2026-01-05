import { NavItem } from "./types";
import {
  Settings,
  PlugIcon,
  AlertCircle,
  Brain,
  Bell,
  Users,
  AlertTriangle,
  Clock,
  TrendingDown,
  Heart,
  Zap,
  Snowflake,
  Database,
  Github,
  MessageSquare,
  Cpu,
  Wrench,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    id: "general",
    label: "General",
    icon: <Settings className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <PlugIcon className="w-5 h-5" />,
    path: "/dashboard/integrations",
  },
  {
    id: "alert-rules",
    label: "Alert Rules",
    icon: <AlertCircle className="w-5 h-5" />,
    path: "/dashboard/alert-rules",
  },
  {
    id: "ai-models",
    label: "AI Models",
    icon: <Brain className="w-5 h-5" />,
    path: "/dashboard/ai-models",
  },

  {
    id: "team",
    label: "Team",
    icon: <Users className="w-5 h-5" />,
    path: "/dashboard/team",
  },
];

export const statData = [
  {
    variant: "compact" as const,
    label: "Active Incidents",
    value: 3,
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    trend: { value: "↑ 1", isPositive: false },
    meta: "vs. last 24 hours",
  },
  {
    variant: "compact" as const,
    label: "MTTR (AVG)",
    value: "45m",
    icon: Clock,
    iconColor: "text-blue-400",
    trend: { value: "↓ 5m", isPositive: true },
    meta: "Mean time to resolution",
  },
  {
    variant: "compact" as const,
    label: "Noise Reduction",
    value: "99.2%",
    icon: TrendingDown,
    iconColor: "text-green-500",
    trend: { value: "+2.1%", isPositive: true },
    meta: "AI Signal-to-Noise Ratio",
  },
  {
    variant: "detailed" as const,
    label: "System Health",
    value: "98%",
    progressValue: 98,
    progressColor: "green" as const,
    icon: Heart,
    iconColor: "text-green-500",
    trend: { value: "+0.5%", isPositive: true },
  },
];

export const integrations = [
  {
    category: "Observability Sources",
    items: [
      {
        id: "prometheus",
        icon: <Zap className="w-5 h-5 text-white" />,
        iconBgColor: "bg-orange-500",
        title: "Prometheus",
        description: "Ingesting metrics from 12 clusters. Sync frequency: 30s.",
        status: "connected" as const,
        lastSync: "2h ago",
        actionLabel: "Configure",
      },
      {
        id: "opentelemetry",
        icon: <Snowflake className="w-5 h-5 text-white" />,
        iconBgColor: "bg-blue-500",
        title: "OpenTelemetry",
        description: "Standard OTLP receiver active. Tracing enabled.",
        status: "connected" as const,
        lastSync: "1h ago",
        actionLabel: "Configure",
      },
      {
        id: "datadog",
        icon: <Database className="w-5 h-5 text-white" />,
        iconBgColor: "bg-purple-500",
        title: "Datadog",
        description:
          "Connect your Datadog account to correlate logs and events.",
        status: "disconnected" as const,
        lastSync: undefined,
        actionLabel: "Connect",
      },
    ],
  },
  {
    category: "Code & Communication",
    items: [
      {
        id: "github",
        icon: <Github className="w-5 h-5 text-white" />,
        iconBgColor: "bg-gray-700",
        title: "GitHub",
        description: "Tracking deployment events from 48 repositories.",
        status: "synced" as const,
        lastSync: "Watching: main, prod",
        actionLabel: "Configure",
      },
      {
        id: "slack",
        icon: <MessageSquare className="w-5 h-5 text-white" />,
        iconBgColor: "bg-pink-500",
        title: "Slack",
        description: "Sending critical alerts to #incidents and #prod-alerts.",
        status: "connected" as const,
        lastSync: "2 channels active",
        actionLabel: "Edit Channels",
      },
    ],
  },
];

export const suppressionPolicies = [
  {
    id: "db-cpu-flapping",
    icon: <Cpu className="w-5 h-5 text-white" />,
    iconBgColor: "bg-blue-500",
    name: "DB CPU Flapping",
    description: "Critical 1hr",
    condition: "cpu > 90% AND duration < 1s",
    impact: "Suppresses ~450 alerts/week",
    status: "active" as const,
  },
  {
    id: "weekly-maintenance",
    icon: <Wrench className="w-5 h-5 text-white" />,
    iconBgColor: "bg-purple-500",
    name: "Weekly Maintenance",
    description: "sat 01:00 - 0Z:30 AM UTC",
    condition: "any >= 300 MBs; 1ms -< 02:30 am utc",
    impact: "Suppresses all Sev1 alerts",
    status: "active" as const,
  },
];
