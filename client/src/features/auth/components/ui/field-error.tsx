interface FieldErrorProps {
  message?: string;
}

export const FieldError = ({ message }: FieldErrorProps) =>
  message ? <p className="mt-1 text-sm text-red-500">{message}</p> : null;
