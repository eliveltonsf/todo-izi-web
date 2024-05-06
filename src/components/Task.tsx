import { TaskProps } from "../types/task";

export default function Task({
  id,
  onCheck,
  title,
  description,
  status = false,
}: TaskProps) {
  const sendCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck &&
      onCheck({ id: Number(e.target.value), status: e.target.checked });
  };
  return (
    <div
      className={`flex justify-start items-center ${
        status ? "border-2 border-yellow-500" : "border-2 border-blue-400"
      }  gap-3 rounded-lg w-full py-3 px-6 mt-8 md:my-3`}
    >
      <input
        type="checkbox"
        defaultChecked={status}
        value={id}
        onChange={sendCheck}
        className="accent-yellow-500"
      />
      <div className="flex flex-col justify-start items-start">
        <span
          className={`text-gray-500 ${
            status ? "line-through" : "no-underline"
          }`}
        >
          <span
            className={`font-semibold ${
              status ? "text-yellow-500" : "text-blue-400"
            }`}
          >
            Título:
          </span>
          {title}
        </span>
        <span
          className={`text-gray-500 ${
            status ? "line-through" : "no-underline"
          }`}
        >
          <span
            className={`font-semibold ${
              status ? "text-yellow-500" : "text-blue-400"
            }`}
          >
            Descrição:
          </span>{" "}
          {description}
        </span>
      </div>
    </div>
  );
}
