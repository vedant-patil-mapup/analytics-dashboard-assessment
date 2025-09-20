import { Car, MapPin, Calendar, Tag, Building2 } from "lucide-react";

export const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

export const TABS = [
  { id: "overview", label: "EV Overview", Icon: Car },
  { id: "geography", label: "EV Distribution by Region", Icon: MapPin },
  { id: "models", label: "EV Makes & Models", Icon: Tag },
  { id: "timeline", label: "EV Timeline", Icon: Calendar },
  { id: "utilities", label: "EV Utility Providers", Icon: Building2 },
];

export const TAB_CLASSES = "text-xl font-bold text-blue-500 dark:text-blue-400"; 
export const ACTIVE_TAB_CLASSES = "text-xl font-bold text-blue-700 dark:text-blue-600";
