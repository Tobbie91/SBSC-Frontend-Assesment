export type Status = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority?: 'low' | 'med' | 'high';
  labels?: string[];
  createdAt: number;
  updatedAt: number;
}
