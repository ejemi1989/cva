import React from 'react';

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  title: string;
  description: string;
  header: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({ title, description, header, icon, className }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="mb-2">{header}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="mt-auto">{icon}</div>
    </div>
  );
};