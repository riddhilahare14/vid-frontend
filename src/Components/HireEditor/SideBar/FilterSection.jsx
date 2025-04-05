import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FilterSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

