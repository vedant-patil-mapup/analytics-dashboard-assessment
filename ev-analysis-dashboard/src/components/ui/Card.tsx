import React from "react";
import { getThemeClasses } from "../../constants/theme";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-2xl border shadow-sm ${className}`}>{children}</div>
);

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-5 ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
  isDark,
}) => {
  const theme = getThemeClasses(isDark);
  return (
    <h3
      className={`text-[15px] sm:text-[19px]  font-semibold leading-none tracking-tight ${className} ${theme.text.secondary}`}
    >
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <div className={`p-2 sm:p-3 ${className}`}>{children}</div>;
