export interface ITodoItem {
  id: number;
  text: string;
  isDone: boolean;
}
export interface ITodoItemProps {
  todo: ITodoItem;
  handleDelete(id: number): void;
  handleDone(id: number): void;
  handleEdit(id: number, text: string): void;
}

export interface IAppState {
  todos: ITodoItem[];
  value: string;
  radio: string;
}

export interface ITodoitemState {
  isEdit: boolean;
}
