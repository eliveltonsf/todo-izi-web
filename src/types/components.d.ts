import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

export interface ButtonProps {
  children: ReactNode;
  isLoadind: boolean;
  className: string;
}

export interface HeaderProps {
  user: string;
}

export type TextInputProps = {
  name?: string;
  type: string;
  placeholderText?: string;
  register?: UseFormRegister;
  errorsLabel?: string;
  defaultValue?: string;
  value?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export interface ListTaskProps {
  taskList: TaskProps[];
  totalPages: number;
  onPageClick: (info: number) => void;
  onRemoveTask: (id: string) => void;
  onUpdateTask: (updateValue: UpdateTask) => void;
}

export type ToastProps = {
  success: true | false;
  title: string;
} & HTMLAttributes<HTMLDivElement>;
