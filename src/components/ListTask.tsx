import { SyntheticEvent, useEffect, useState } from "react";
import { ListTaskProps } from "../types/components";
import { UpdateTaskProps } from "../types/task";
import Task from "./Task";

export default function ListTask({
  onPageClick,
  onRemoveTask,
  onUpdateTask,
  totalPages,
  taskList,
}: ListTaskProps) {
  const [listCurrentPage, setListCurrentPage] = useState<number[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setListCurrentPage([]);
  }, []);

  useEffect(() => {
    const dataPageTotal = Array.from(
      { length: totalPages },
      (_, index) => index
    );
    setListCurrentPage(dataPageTotal);
  }, [totalPages]);

  const sendDeleteTask = async (id: string) => {
    onRemoveTask(id);
  };

  const sendCurrentPage = (e: SyntheticEvent<EventTarget>) => {
    setCurrentPage(Number((e.target as HTMLInputElement).innerHTML));
    onPageClick(Number((e.target as HTMLInputElement).innerHTML));
  };

  const sendCheckedTask = (checkedTask: UpdateTaskProps) => {
    onUpdateTask(checkedTask);
  };

  return (
    <div className="flex flex-col h-auto justify-start">
      <ul className="md:max-w-7xl text-white list-none flex flex-col w-full">
        {taskList.map((task) => {
          return (
            <li key={task.id} className="w-full">
              <div className="flex w-full h-auto gap-3 flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-2 w-full">
                  <Task
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    onCheck={sendCheckedTask}
                  />
                </div>
                <div className="flex w-full md:w-auto justify-center items-center h-auto">
                  <button
                    onClick={() => sendDeleteTask(String(task.id))}
                    className="flex justify-center items-center w-full md:w-16 h-[3rem] px-0 text-white cursor-pointer border-none rounded-lg bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="flex items-center justify-center list-none">
        {listCurrentPage &&
          listCurrentPage.map((_, index) => (
            <li
              key={index}
              value={index}
              onClick={sendCurrentPage}
              className={
                currentPage == index + 1
                  ? "cursor-default flex justify-center items-center h-8 w-8 rounded text-white bg-blue-400 my-6 mx-4"
                  : "cursor-pointer flex justify-center items-center h-8 w-8 rounded text-white bg-gray-500 my-6 mx-4 hover:opacity-90"
              }
            >
              {index + 1}
            </li>
          ))}
      </ul>
    </div>
  );
}
