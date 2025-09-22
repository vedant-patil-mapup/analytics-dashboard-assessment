export const LIGHT_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
];

export const DARK_COLORS = [
  "#818cf8",
  "#34d399",
  "#fb923c",
  "#f87171",
  "#2dd4bf",
  "#a78bfa",
  "#fbbf24",
  "#f472b6",
];

export const getThemeClasses = (isDark: boolean) => ({
  main: isDark
    ? "bg-gray-900 text-white min-h-screen"
    : "bg-gray-50 text-gray-900 min-h-screen",
  card: isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
  header: isDark ? "bg-gray-800/95" : "bg-white/95",
  border: isDark ? "border-gray-700" : "border-gray-200",
  text: {
    secondary: isDark ? "text-gray-400" : "text-gray-600",
    muted: isDark ? "#9CA3AF" : "#6B7280",
  },
  input: isDark
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
  button: isDark
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-gray-100 hover:bg-gray-200",
});