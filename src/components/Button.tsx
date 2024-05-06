import { CircularProgress } from "@mui/material";
import { ButtonProps } from "../types/components";

export default function Button({
  children,
  isLoadind,
  className,
}: ButtonProps) {
  return (
    <button className={className}>
      {isLoadind ? <CircularProgress color="inherit" size={18} /> : children}
    </button>
  );
}
