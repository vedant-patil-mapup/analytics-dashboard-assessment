import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`chart-container ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default ChartContainer;
