import AxiosController from "@/lib/axios-controller";
import { AppError } from "@/lib/types";
import { useState } from "react";

type AxiosMethod = "get" | "post" | "put" | "delete";

interface UseRequestProps {
  url: string;
  method: AxiosMethod;
  body: any;
  onSuccess?: () => void;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<React.ReactNode>(null);

  const doRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setErrors(null);
      const response = await AxiosController.client[method](url, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="flex flex-col bg-red-600/30 rounded-md p-2">
          <ul>
            {(error as AppError).response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
