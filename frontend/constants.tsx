import { NavItem } from "./types";
import {
  Settings,
  PlugIcon,
  AlertCircle,
  Brain,
  Bell,
  Users,
} from "lucide-react";

export const navItems: NavItem[] = [
  { id: "general", label: "General", icon: <Settings className="w-5 h-5" /> },
  {
    id: "integrations",
    label: "Integrations",
    icon: <PlugIcon className="w-5 h-5" />,
    isActive: true,
  },
  {
    id: "alert-rules",
    label: "Alert Rules",
    icon: <AlertCircle className="w-5 h-5" />,
  },
  { id: "ai-models", label: "AI Models", icon: <Brain className="w-5 h-5" /> },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  { id: "team", label: "Team", icon: <Users className="w-5 h-5" /> },
];
