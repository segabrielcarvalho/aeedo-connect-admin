import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-md">
      {icon || <ExclamationCircleIcon className="h-16 w-16 text-gray-400" />}
      <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default EmptyState;
