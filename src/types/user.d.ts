export interface RegisterDataFormProps {
  email: string;
  name?: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDataProps {
  email: string;
  name?: string;
  password: string;
}

export interface LoginUserFormProps {
  email: string;
  password: string;
}
