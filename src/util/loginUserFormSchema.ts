import { z } from "zod";

const loginUserFormSchema = () => {
  return z.object({
    email: z
      .string()
      .min(1, "Informe seu e-mail")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "E-mail inválido"
      ),
    password: z
      .string()
      .min(1, "Informe seu senha")
      .regex(/^.{4,8}$/, "Senha inválida"),
  });
};

export default loginUserFormSchema;
