import { zodResolver } from "@hookform/resolvers/zod";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { useToast } from "../hooks/toast";
import api from "../services/api";
import { RegisterDataFormProps, RegisterDataProps } from "../types/user";
import createUserFormSchema from "../util/createUserFormSchema";

export default function SingUp() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const schema = createUserFormSchema();
  type CreateUserFormSchema = z.infer<typeof schema>;

  const [userFormData, setUserFormData] = useState<RegisterDataFormProps>(
    {} as RegisterDataFormProps
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormSchema>({
    resolver: zodResolver(schema),
  });

  const handleInputChange = (e: SyntheticEvent<EventTarget>) => {
    setUserFormData({
      ...userFormData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  async function handleUserData() {
    const data: RegisterDataProps = {
      name: userFormData.name,
      email: userFormData.email,
      password: userFormData.password,
    };

    setLoading(true);

    await api
      .post("api/user", data)
      .then((response) => {
        console.log(response);
        addToast({
          title: "Usuário cadastrado com sucesso",
          success: true,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        addToast({
          title: "Verifique os dados ou tente novamente",
          success: false,
        });
      });
  }

  return (
    <main className="flex flex-1 justify-center items-center w-full h-svh m-auto">
      <div className="flex flex-col justify-center items-center w-96 h-full">
        <div className="flex flex-col items-center justify-center mb-9 w-full">
          <h1 className="text-2xl uppercase font-bold text-blue-400 text-center">
            Cadastro de Usuário
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handleUserData)}
          className="p-3  flex flex-col gap-3 w-full"
          autoComplete="off"
        >
          <TextInput
            type="email"
            name="email"
            placeholderText="E-mail"
            defaultValue={userFormData.email}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.email?.message}
            autoComplete="off"
          />

          <TextInput
            type="name"
            name="name"
            placeholderText="Nome"
            defaultValue={userFormData.name}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.name?.message}
            autoComplete="off"
          />

          <TextInput
            type="password"
            name="password"
            placeholderText="Senha"
            defaultValue={userFormData.password}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.password?.message}
            autoComplete="off"
          />

          <TextInput
            type="password"
            name="confirmPassword"
            placeholderText="Confirme sua senha"
            defaultValue={userFormData.confirmPassword}
            onChange={handleInputChange}
            register={register}
            errorsLabel={errors.confirmPassword?.message}
            autoComplete="off"
          />

          <Button
            isLoadind={loading}
            className="flex justify-center items-center outline-none border-none h-auto py-3 px-6 bg-blue-400 text-white rounded-lg w-full focus:outline-none"
          >
            Cadastrar
          </Button>
          <Link to="/" className="text-gray-400 text-center">
            Voltar
          </Link>
        </form>
      </div>
    </main>
  );
}
