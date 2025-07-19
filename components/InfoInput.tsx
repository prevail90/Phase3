
import React from 'react';

interface InfoInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InfoInput: React.FC<InfoInputProps> = ({ label, value, name, onChange, placeholder, type = 'text' }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900"
      />
    </div>
  );
};

export default InfoInput;