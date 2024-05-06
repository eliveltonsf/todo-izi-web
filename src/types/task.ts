export interface TaskProps {
  id: number;
  title: string;
  description: string;
  status: boolean;
  onCheck?: (checked: UpdateTaskProps) => void;
}

export interface UpdateTaskProps {
  id: number;
  status: boolean;
}
