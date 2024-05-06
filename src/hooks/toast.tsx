/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useState } from "react";

import { Toast } from "../components/Toast";

export interface ToastMessage {
  success: false | true;
  title: string;
}
interface ToastContextData {
  addToast(message: ToastMessage): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider = ({ children }: any) => {
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);
  const [isToast, setIsToast] = useState<boolean>(false);
  const [count, setCount] = useState<number>(5000);

  let time: any;

  const addToast = useCallback((message: ToastMessage) => {
    setMessage(message);
    setIsToast(true);
    time = setTimeout(() => setIsToast(false), count);
  }, []);

  const removeToast = useCallback(() => {
    setMessage({} as ToastMessage);
    setIsToast(false);
    setCount(5000);
    clearTimeout(time);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {isToast ? (
        <Toast success={message.success} title={message.title} />
      ) : null}
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
