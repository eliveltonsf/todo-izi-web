import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import ListTask from "../components/ListTask";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "../components/Input";
import { useAuth } from "../hooks/auth";
import { useToast } from "../hooks/toast";
import api from "../services/api";
import { UpdateTaskProps } from "../types/task";
import createTaskFormSchema from "../util/createTaskFormSchema";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataTasks, setDataTasks] = useState([]);

  const { addToast } = useToast();
  const { name } = useAuth();

  const schema = createTaskFormSchema();
  type CreateTaskFormSchema = z.infer<typeof schema>;

  const [taskFormData, setTaskFormData] = useState<CreateTaskFormSchema>(
    {} as CreateTaskFormSchema
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(schema),
  });

  const loadData = useCallback(async () => {
    const task = await api.get(`api/task?offset=${currentPage}&limit=5`);

    const taskData = task.data.tasks;
    const totalPages = task.data.totalPages;
    setDataTasks(taskData);
    setTotalPages(totalPages);
  }, [currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e: SyntheticEvent<EventTarget>) => {
    setTaskFormData({
      ...taskFormData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const removeTask = async (id: string) => {
    try {
      await api.delete(`api/task/${id}`);
      addToast({ success: true, title: "Task excluída com sucesso!" });
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (updateValue: UpdateTaskProps) => {
    const { id, status } = updateValue;
    try {
      await api.patch(`api/task/${id}`, {
        status,
      });
      loadData();
      addToast({ success: true, title: "Task atualizada com sucesso!" });
    } catch (err) {
      console.log(err);
    }
  };

  async function handleTaskData() {
    const data = {
      title: taskFormData.title,
      description: taskFormData.description,
      status: false,
    };

    await api
      .post("api/task", data)
      .then((response) => {
        console.log(response);
        addToast({
          title: "Task criada com sucesso",
          success: true,
        });
        setValue("title", "");
        setValue("description", "");
        loadData();
      })
      .catch((error) => {
        console.log(error);
        addToast({
          title: "Verifique os dados e tente novamente",
          success: false,
        });
      });
  }

  return (
    <main className="flex justify-center items-center overflow-y-scroll style-scrollbar">
      <div className="max-w-7xl h-svh w-full after:contents-[''] after:table after:clear-both p-3">
        <Header user={name} />

        <div className="h-auto w-full backdrop:blur-sm flex flex-col rounded-lg my-3 flex-wrap mb-6">
          <div className="flex flex-wrap gap-2">
            <form
              onSubmit={handleSubmit(handleTaskData)}
              className="flex flex-1 gap-3 flex-wrap md:flex-nowrap"
              autoComplete="off"
            >
              <TextInput
                type="text"
                name="title"
                placeholderText="Digite o titulo da tarefa"
                defaultValue={taskFormData.title}
                onChange={handleInputChange}
                register={register}
                errorsLabel={errors.title?.message}
                autoComplete="off"
              />

              <TextInput
                type="text"
                name="description"
                placeholderText="Digite a descrição da tarefa"
                defaultValue={taskFormData.description}
                onChange={handleInputChange}
                register={register}
                errorsLabel={errors.description?.message}
                autoComplete="off"
              />

              <button className="flex justify-center items-center w-full md:w-16 h-auto px-3 py-3 text-white cursor-pointer border-none rounded-lg bg-blue-400">
                Add
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <ListTask
            taskList={dataTasks}
            totalPages={totalPages}
            onPageClick={handleCurrentPage}
            onRemoveTask={removeTask}
            onUpdateTask={updateTask}
          />
        )}
      </div>
    </main>
  );
}
