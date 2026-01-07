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
  Shield,
  AlertOctagon,
  Gauge,
  Target,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  Mail,
  ChartBarDecreasing,
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
    id: "analytics",
    label: "Analytics",
    icon: <ChartBarDecreasing className="w-5 h-5" />,
    path: "/dashboard/analytics",
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

export const alertRulesData = [
  {
    variant: "compact" as const,
    label: "Active Rules",
    value: 142,
    icon: Shield,
    iconColor: "text-blue-400",
    trend: { value: "+2%", isPositive: true },
    meta: "Rules enabled",
  },
  {
    variant: "compact" as const,
    label: "Inactive Rules",
    value: 12,
    icon: AlertCircle,
    iconColor: "text-gray-400",
    trend: { value: "0%", isPositive: false },
    meta: "Disabled",
  },
  {
    variant: "compact" as const,
    label: "Suppressed (24h)",
    value: "1,204",
    icon: Bell,
    iconColor: "text-green-500",
    trend: { value: "+15%", isPositive: true },
    meta: "Alerts suppressed",
  },
  {
    variant: "compact" as const,
    label: "Routing Errors",
    value: 0,
    icon: AlertOctagon,
    iconColor: "text-red-400",
    trend: { value: "Stable", isPositive: true },
    meta: "No errors",
  },
];

export const aiModelsData = [
  {
    variant: "compact" as const,
    label: "Active Models",
    value: 12,
    icon: Cpu,
    iconColor: "text-blue-400",
    trend: { value: "+2.2%", isPositive: true },
    meta: "All models operational",
  },
  {
    variant: "compact" as const,
    label: "Global Accuracy",
    value: "98.4%",
    icon: Target,
    iconColor: "text-green-500",
    trend: { value: "+0.1%", isPositive: true },
    meta: "Weighted average efficiency",
  },
  {
    variant: "compact" as const,
    label: "Alerts Suppressed",
    value: "45.2%",
    icon: BarChart3,
    iconColor: "text-purple-400",
    trend: { value: "+5.2%", isPositive: true },
    meta: "Noise reduction effective",
  },
  {
    variant: "compact" as const,
    label: "Last Retraining",
    value: "2h ago",
    icon: RefreshCw,
    iconColor: "text-cyan-400",
    trend: { value: "Idle", isPositive: true },
    meta: "Status: Idle",
  },
];

export const teamData = [
  {
    variant: "compact" as const,
    label: "Total Users",
    value: 42,
    icon: Users,
    iconColor: "text-blue-400",
    trend: { value: "+4", isPositive: true },
    meta: "this week",
  },
  {
    variant: "compact" as const,
    label: "Active Admins",
    value: 5,
    icon: ShieldCheck,
    iconColor: "text-green-500",
    trend: { value: "2", isPositive: true },
    meta: "super admins",
  },
  {
    variant: "compact" as const,
    label: "SRE Team",
    value: 12,
    icon: Users,
    iconColor: "text-purple-400",
    trend: { value: "+1", isPositive: true },
    meta: "Active members",
  },
  {
    variant: "compact" as const,
    label: "Pending Invites",
    value: 3,
    icon: Mail,
    iconColor: "text-orange-400",
    trend: { value: "0", isPositive: true },
    meta: "Awaiting response",
  },
];

export const incidentDetailData = [
  {
    variant: "compact" as const,
    label: "Severity Level",
    value: "P1- Critical",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    trend: { value: "", isPositive: false },
    meta: "",
  },
  {
    variant: "compact" as const,
    label: "Elapsed Time",
    value: "00:24:12",
    icon: Clock,
    iconColor: "text-gray-400",
    trend: { value: "", isPositive: true },
    meta: "",
  },
  {
    variant: "compact" as const,
    label: "Affected Users",
    value: "~12.5k",
    icon: Users,
    iconColor: "text-cyan-400",
    trend: { value: "+2k/min", isPositive: false },
    meta: "",
  },
  {
    variant: "compact" as const,
    label: "AI Confidence",
    value: "88%",
    icon: Brain,
    iconColor: "text-blue-400",
    trend: { value: "High", isPositive: true },
    meta: "",
  },
];

export const rootCauseHypothesis = {
  title: "Bad Deployment: checkout-service v2.4.1",
  description:
    "Suspected trigger: Deployment event at 14:02 UTC correlated with 500 error spike.",
  confidence: 92,
  reasons: [
    {
      text: "Latency jumped from 45ms to 1200ms within 30s of deployment completion.",
    },
    {
      text: "New error signature ConnectionRefused: DB_POOL appeared in logs.",
      highlight: "ConnectionRefused: DB_POOL",
    },
  ],
};

export const incidentTimelineData = [
  { time: "13:48", value: 15, status: "normal" },
  { time: "13:51", value: 22, status: "normal" },
  { time: "13:54", value: 18, status: "normal" },
  { time: "13:57", value: 20, status: "normal" },
  { time: "13:59", value: 25, status: "normal", event: "Deploy v2.4.1" },
  { time: "14:02", value: 45, status: "warning" },
  { time: "14:05", value: 85, status: "critical", annotation: "Latency > 1s" },
  { time: "14:08", value: 100, status: "critical" },
  { time: "14:11", value: 92, status: "critical" },
  { time: "14:14", value: 75, status: "critical" },
  { time: "14:17", value: 60, status: "warning" },
  { time: "14:20", value: 55, status: "warning" },
  { time: "14:23", value: 48, status: "warning" },
];

export const blastRadiusData = {
  nodes: [
    {
      id: "web-client",
      label: "web-client",
      icon: "ShoppingCart",
      status: "degraded",
      x: 30, // percentage
      y: 35,
    },
    {
      id: "checkout-svc",
      label: "checkout-svc",
      icon: "Server",
      status: "critical",
      x: 50,
      y: 55,
    },
    {
      id: "payment-gw",
      label: "payment-gw",
      icon: "Banknote",
      status: "healthy",
      x: 70,
      y: 75,
    },
  ],
  edges: [
    { source: "web-client", target: "checkout-svc", status: "critical" },
    { source: "checkout-svc", target: "payment-gw", status: "healthy" },
  ],
};

export const incidentRCAData = {
  summary:
    "High latency detected in payment-service-v2 coincided with a spike in database connection pool exhaustion. The system identified a potential memory leak in the new connection handling logic deployed 45 minutes ago.",
  rootCause: "Connection Pool Exhaustion (PostgreSQL)",
  confidence: 92,
  affectedServices: ["payment-service", "checkout-api", "auth-provider"],
  evidence: [
    { label: "Error Rate", value: "+15%" },
    { label: "Avg Latency", value: "2.4s" },
    { label: "DB Connections", value: "Maxed (1000)" },
  ],
  timeline: [
    { time: "10:42:00", event: "Deployment v2.4.1 initiated", type: "info" },
    {
      time: "10:48:30",
      event: "Latency spike (>500ms) detected",
      type: "warning",
    },
    { time: "10:49:15", event: "Error rate increased to 5%", type: "error" },
    { time: "10:50:00", event: "Auto-scaling event triggered", type: "info" },
  ],
};

export const liveLogs = [
  {
    timestamp: "14:24:12",
    level: "ERROR",
    message: "connection refused: database pool...",
    color: "text-red-400",
  },
  {
    timestamp: "14:24:11",
    level: "ERROR",
    message: "transaction rollback triggered",
    color: "text-red-400",
  },
  {
    timestamp: "14:24:10",
    level: "INFO",
    message: "retry attempt 3/5...",
    color: "text-gray-400",
  },
  {
    timestamp: "14:24:09",
    level: "WARN",
    message: "high latency detected in pool",
    color: "text-yellow-400/80",
  },
];

export const analyticsStatData = [
  {
    variant: "compact" as const,
    label: "Mean Time to Resolve",
    value: "45m",
    icon: Clock,
    iconColor: "text-green-500",
    trend: { value: "↓ 5.2%", isPositive: true },
    meta: "MTTR improving",
  },
  {
    variant: "compact" as const,
    label: "Mean Time to Detect",
    value: "4m 12s",
    icon: AlertTriangle,
    iconColor: "text-blue-400",
    trend: { value: "↓ 8s", isPositive: true },
    meta: "Detection speed",
  },
  {
    variant: "compact" as const,
    label: "Noise Reduction",
    value: "94%",
    icon: TrendingDown,
    iconColor: "text-purple-400",
    trend: { value: "+2.1%", isPositive: true },
    meta: "AI efficiency",
  },
  {
    variant: "compact" as const,
    label: "Remaining Error Budget",
    value: "99.92%",
    icon: ShieldCheck,
    iconColor: "text-yellow-500",
    trend: { value: "Bind High", isPositive: false },
    meta: "SLA status",
  },
];

export const analyticsVolumeData = [
  { time: "06:00", incidents: 12, isDeployment: false },
  { time: "07:00", incidents: 15, isDeployment: false },
  { time: "08:00", incidents: 18, isDeployment: false },
  { time: "09:00", incidents: 35, isDeployment: true }, // Deployment 1
  { time: "10:00", incidents: 25, isDeployment: false },
  { time: "11:00", incidents: 45, isDeployment: false },
  { time: "12:00", incidents: 30, isDeployment: false },
  { time: "13:00", incidents: 20, isDeployment: false },
  {
    time: "14:00",
    incidents: 85,
    isDeployment: false,
    annotation: "Critical Spike",
  }, // Spike
  { time: "15:00", incidents: 60, isDeployment: true }, // Deployment 2
  { time: "16:00", incidents: 40, isDeployment: false },
  { time: "17:00", incidents: 30, isDeployment: false },
];

export const serviceHealthData = Array.from({ length: 18 }, (_, i) => {
  let status = "healthy";
  if (i === 6) status = "degraded"; // Row 2, Col 1
  if (i === 9) status = "critical"; // Row 2, Col 4
  return { id: i, status };
});

export const rootCauseStats = [
  { name: "Database Timeout", value: 42, color: "bg-cyan-400" },
  { name: "3rd Party API", value: 28, color: "bg-purple-400" },
  { name: "Config Error", value: 15, color: "bg-blue-500" },
  { name: "Memory Leak", value: 12, color: "bg-red-400" },
];

export const alertFunnelData = {
  rawAlerts: 14203,
  correlatedGroups: 842,
  incidents: 42,
  efficiency: 0.3,
};

export const teamLoadData = [
  { team: "CORE", load: 55, status: "healthy" },
  { team: "PAY", load: 30, status: "healthy" },
  { team: "OPS", load: 88, status: "critical" },
  { team: "DATA", load: 45, status: "healthy" },
];
