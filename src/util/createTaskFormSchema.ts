import { z } from "zod";

const createTaskFormSchema = () => {
  return z.object({
    title: z.string().min(1, "Informe o título da tarefa"),
    description: z.string().min(1, "Informe a descrição da tarefa"),
  });
};

export default createTaskFormSchema;
