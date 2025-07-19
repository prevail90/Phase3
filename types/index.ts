
export enum TaskStatus {
  GO = 'GO',
  NO_GO = 'NO_GO',
  NA = 'N/A',
  RETEST = 'RETEST',
  UNGRADED = 'UNGRADED'
}

export interface Task {
  id: string;
  description: string;
}

export interface TaskSectionData {
  title: string;
  notes?: string;
  tasks: Task[];
  hasNaOption: boolean;
  hasRetestOption?: boolean;
  columns?: number;
}

// This makes libraries available on the window object for TypeScript
declare global {
    interface Window {
        PDFLib: any;
        SignaturePad: any;
    }
}