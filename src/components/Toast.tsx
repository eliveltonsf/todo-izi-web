import { useToast } from "../hooks/toast";
import "../styles/global.css";
import { ToastProps } from "../types/components";

export const Toast = (props: ToastProps) => {
  const { success, title, ...rest } = props;
  const { removeToast } = useToast();

  return (
    <div
      className={`w-auto ${
        success ? "bg-green-100" : "bg-red-100"
      } flex flex-1 items-center overflow-hidden absolute bottom-8 left-4 z-[999] p-2 rounded-lg`}
      {...rest}
    >
      <div className="flex w-full h-full relative">
        {success === true ? (
          <img
            src="/assets/images/toast/Success.svg"
            alt="Success"
            width={16}
            height={16}
            className="m-[0.33rem] mr-4"
          />
        ) : (
          <img
            src="/assets/images/toast/Failed.svg"
            alt="Failed"
            width={16}
            height={16}
            className="m-[0.33rem] mr-4"
          />
        )}

        <div className="w-full">
          <h2
            className={`w-full ${
              success ? "text-green-500" : "text-red-500"
            } text-base font-semibold mr-16`}
          >
            {title}
          </h2>
        </div>

        <img
          src="/assets/images/toast/Close.svg"
          alt="Close"
          width={12}
          height={12}
          className="absolute right-2 top-2"
          onClick={removeToast}
        />
      </div>
    </div>
  );
};
