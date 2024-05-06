import { LogOut } from "lucide-react";
import TodoIziLogo from "../assets/todoizi.svg?react";
import { useAuth } from "../hooks/auth";
import { HeaderProps } from "../types/components";

export default function Header({ user }: HeaderProps) {
  const { methodSignOut } = useAuth();

  return (
    <div className="flex flex-row justify-center items-center flex-wrap gap-3 md:justify-between">
      <div className="flex justify-start items-center">
        <div className="text-center">
          <TodoIziLogo className="w-20 h-20 sm:w-35 sm:h-35" />
        </div>
      </div>
      <div className="flex justify-center items-center md:items-end ">
        <div className="flex flex-col items-center md:items-end">
          <h1 className="mx-2 text-3xl font-sora">Olá, {user}.</h1>
          <p className="mx-2 text-base font-sora">
            Seja bem-vindo ao seu painel de tarefas.
          </p>
        </div>

        <button className="flex justify-center items-center w-full md:w-16 h-auto px-3 py-3 text-white cursor-pointer border-none rounded-lg pl-6">
          <LogOut
            size={22}
            className="text-gray-400 hover:text-red-500"
            onClick={methodSignOut}
          />
        </button>
      </div>
    </div>
  );
}
