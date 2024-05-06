import { z } from "zod";

const createUserFormSchema = () => {
  return z
    .object({
      name: z.string().optional(),
      email: z
        .string()
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "E-mail inválido"
        ),
      password: z
        .string()
        .regex(/^.{4,8}$/, "Use de 4 até 8 caracteres com letras e símbolos"),
      confirmPassword: z.string().min(1, "Confirmar sua senha é importante"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não correspondem",
      path: ["confirmPassword"],
    });
};

export default createUserFormSchema;
