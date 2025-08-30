import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <div className="loading-message">{message}</div>
    </div>
  );
};

export default LoadingSpinner;
