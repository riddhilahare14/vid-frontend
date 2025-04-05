import React from 'react';

export const RadioOption = ({ id, name, value, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
      />
      <label htmlFor={id} className="ml-3 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

