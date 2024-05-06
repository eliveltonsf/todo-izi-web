import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { TextInputProps } from "../types/components";

export const TextInput = (props: TextInputProps) => {
  const { placeholderText, register, name, type, value, errorsLabel, ...rest } =
    props;

  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <div {...rest} className="w-full">
      <div
        className={`w-full h-auto rounded-lg bg-white focus:accent-transparent relative`}
      >
        <input
          type={visiblePassword ? "text" : type}
          placeholder={placeholderText}
          {...register(name)}
          className={`rounded-lg py-3 px-6 focus:accent-transparent w-full h-auto placeholder-shown:capitalize placeholder-shown:text-gray-regular placeholder:text-14 ${
            errorsLabel
              ? "outline-red-500 border-2 border-red-500"
              : "outline-yellow-500 border-2 border-blue-400"
          }`}
          value={value}
          defaultValue={props.defaultValue}
          {...rest}
        />

        {type === "password" && !visiblePassword && (
          <Eye
            size={22}
            className="text-gray-400 absolute right-3 top-3.5"
            onClick={() => setVisiblePassword(!visiblePassword)}
          />
        )}

        {type === "password" && visiblePassword && (
          <EyeOffIcon
            size={22}
            className="text-gray-400 absolute right-3 top-3.5"
            onClick={() => setVisiblePassword(!visiblePassword)}
          />
        )}
      </div>

      {errorsLabel && (
        <span className="text-xs font-medium text-red-400 mt-4">
          {errorsLabel}
        </span>
      )}
    </div>
  );
};
