
import React from 'react';
import { TaskSectionData, TaskStatus } from '../types/index';
import TaskRow from './TaskRow';

interface EvaluationSectionProps {
  section: TaskSectionData;
  statuses: Record<string, any>;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onRetestChange?: (taskId: string, retested: boolean) => void;
}

const EvaluationSection: React.FC<EvaluationSectionProps> = ({ section, statuses, onStatusChange, onRetestChange }) => {
  const columnClass = section.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1";
  
  return (
    <div className="mb-6 bg-white rounded-lg p-2 sm:p-4 border-t-4 border-slate-700 shadow-md">
      {section.notes && <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{section.notes}</p>}
      <h3 className={`text-lg font-bold text-gray-800 bg-slate-200 -mx-4 mb-2 px-4 py-2 ${section.notes ? '-mt-2' : '-mt-4 rounded-t-md'}`}>{section.title}</h3>

      <div className={`grid ${columnClass} gap-x-8`}>
        {section.tasks.map(task => {
          const currentTaskStatus = statuses[task.id];
          const isComplexStatus = typeof currentTaskStatus === 'object' && currentTaskStatus !== null && 'retested' in currentTaskStatus;

          return (
            <TaskRow
              key={task.id}
              task={task}
              status={isComplexStatus ? currentTaskStatus.status : currentTaskStatus}
              onStatusChange={onStatusChange}
              hasNaOption={section.hasNaOption}
              hasRetestOption={section.hasRetestOption ?? false}
              isRetested={isComplexStatus ? currentTaskStatus.retested : undefined}
              onRetestChange={onRetestChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EvaluationSection;