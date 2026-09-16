interface FormErrorProps {
  message: string | null;
}

/** Server-side or network error for the whole form. */
export const FormError = ({ message }: FormErrorProps) =>
  message ? (
    <p
      role="alert"
      className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
    >
      {message}
    </p>
  ) : null;
