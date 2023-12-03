"use client"
import { useEffect, useState } from 'react';

interface LoadingWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const LoadingWrapper = ({ children, delay = 2000 }: LoadingWrapperProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay || 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center ">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
