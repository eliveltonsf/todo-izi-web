import { zodResolver } from "@hookform/resolvers/zod";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import TodoIziLogo from "../assets/todoizi.svg?react";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { useAuth } from "../hooks/auth";
import { LoginUserFormProps } from "../types/user";
import loginUserFormSchema from "../util/loginUserFormSchema";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const { methodSignIn } = useAuth();

  const schema = loginUserFormSchema();
  type LoginUserFormSchema = z.infer<typeof schema>;

  const [loginFormData, setLoginFormData] = useState<LoginUserFormProps>(
    {} as LoginUserFormProps
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormSchema>({
    resolver: zodResolver(schema),
  });

  const handleInputChange = (e: SyntheticEvent<EventTarget>) => {
    setLoginFormData({
      ...loginFormData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  async function handleLoginData() {
    setLoading(true);
    try {
      await methodSignIn({
        email: loginFormData.email,
        password: loginFormData.password,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <main className="flex flex-1 justify-center items-center w-full h-svh m-auto">
      <div className="flex flex-col justify-center items-center w-96 h-full">
        <div className="flex flex-col items-center justify-center mb-9 w-full">
          <TodoIziLogo className="mb-3 w-30 h-30" />
        </div>
        <form
          onSubmit={handleSubmit(handleLoginData)}
          className="p-3  flex flex-col gap-3 w-full"
          autoComplete="off"
        >
          <TextInput
            type="email"
            name="email"
            placeholderText="E-mail"
            defaultValue={loginFormData.email}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.email?.message}
            autoComplete="off"
          />

          <TextInput
            type="password"
            name="password"
            placeholderText="Senha"
            defaultValue={loginFormData.password}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.password?.message}
            autoComplete="off"
          />

          <Button
            isLoadind={loading}
            className="flex justify-center items-center outline-none border-none h-auto py-3 px-6 bg-blue-400 text-white rounded-lg w-full focus:outline-none"
          >
            Entrar
          </Button>
          <Link to="/register" className="text-gray-400 text-center">
            Registra-se
          </Link>
        </form>
      </div>
    </main>
  );
}
