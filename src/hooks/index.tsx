import { AuthProvider, AuthProviderProps } from "./auth";
import { ToastProvider } from "./toast";

const AppProvider = ({ children }: AuthProviderProps) => (
  <ToastProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastProvider>
);

export default AppProvider;
