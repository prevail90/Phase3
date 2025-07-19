
import React from 'react';
import { Task, TaskStatus } from '../types/index';

interface TaskRowProps {
  task: Task;
  status: TaskStatus;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  hasNaOption: boolean;
  hasRetestOption: boolean;
  isRetested?: boolean;
  onRetestChange?: (taskId: string, retested: boolean) => void;
}

const RadioButton: React.FC<{
    id: string;
    label: string;
    value: TaskStatus;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    colorClasses: string;
}> = ({ id, label, value, checked, onChange, colorClasses }) => (
    <div className="flex items-center">
        <input
            id={id}
            name={id.split('-')[0]} // group radios by task id
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
            className="hidden"
        />
        <label
            htmlFor={id}
            className={`cursor-pointer px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out border-2
            ${checked ? colorClasses : 'bg-gray-200 border-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
            {label}
        </label>
    </div>
);


const TaskRow: React.FC<TaskRowProps> = ({ task, status, onStatusChange, hasNaOption, hasRetestOption, isRetested, onRetestChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-200 last:border-b-0">
      <p className="text-gray-700 flex-grow mb-2 sm:mb-0 sm:mr-4">{task.description}</p>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <RadioButton
          id={`${task.id}-go`}
          label="GO"
          value={TaskStatus.GO}
          checked={status === TaskStatus.GO}
          onChange={handleStatusChange}
          colorClasses="bg-green-500 border-green-600 text-white"
        />
        <RadioButton
          id={`${task.id}-nogo`}
          label="NO-GO"
          value={TaskStatus.NO_GO}
          checked={status === TaskStatus.NO_GO}
          onChange={handleStatusChange}
          colorClasses="bg-red-500 border-red-600 text-white"
        />
        {hasNaOption && (
          <RadioButton
            id={`${task.id}-na`}
            label="N/A"
            value={TaskStatus.NA}
            checked={status === TaskStatus.NA}
            onChange={handleStatusChange}
            colorClasses="bg-gray-500 border-gray-600 text-white"
          />
        )}
        {hasRetestOption && onRetestChange && (
            <div className="flex items-center pl-4 border-l-2 ml-2">
                <button
                    type="button"
                    onClick={() => onRetestChange(task.id, !isRetested)}
                    disabled={status !== TaskStatus.NO_GO}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out border-2
                    ${isRetested ? 'bg-sky-500 border-sky-600 text-white' : 'bg-gray-200 border-gray-200 text-gray-600'}
                    ${status !== TaskStatus.NO_GO 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover:bg-gray-300'
                    }`}
                >
                  RETEST
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TaskRow;