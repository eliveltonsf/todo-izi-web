import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import api from "../services/api";
import { useToast } from "./toast";

interface AuthContextData {
  token: string;
  name: string;
  methodSignIn(credentials: SignInCredenctials): void;
  methodSignOut(): void;
}

interface AuthState {
  accessToken: string;
  name: string;
}

interface SignInCredenctials {
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ToastMessage {
  success: boolean;
  title: string;
  visible: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@todo-izi:token");
    const name = localStorage.getItem("@todo-izi:name");

    if (accessToken && name) {
      return { accessToken, name };
    }

    return {} as AuthState;
  });

  const methodSignIn = async (credentials: SignInCredenctials) => {
    const { email, password } = credentials;

    try {
      const response = await api.post("api/user/login", {
        email,
        password,
      });

      addToast({
        title: "Login Efetuado.",
        success: true,
      });

      const { accessToken, name } = response.data;

      localStorage.setItem("@todo-izi:token", accessToken);
      localStorage.setItem("@todo-izi:name", name);
      setData({ accessToken, name });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      addToast({
        title: "Verifique seus dados.",
        success: false,
      });
    }
  };

  const methodSignOut = useCallback(() => {
    localStorage.removeItem("@todo-izi:token");
    localStorage.removeItem("@todo-izi:name");
    setData({} as AuthState);
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.accessToken,
        name: data.name,
        methodSignIn,
        methodSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
