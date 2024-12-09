import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="border-b border-gray-200 pb-2">
        <div className="flex justify-between py-2">
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="flex justify-between py-5">
            <div className="flex w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="flex w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="flex w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="flex w-5 h-5 bg-gray-300 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableSkeleton;
