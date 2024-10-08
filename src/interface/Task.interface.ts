export interface Task {
  id: number | string;
  text: string;
  completed: boolean;
  [key: string]: unknown;
}
