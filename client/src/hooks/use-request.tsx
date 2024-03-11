import { AppError } from "@/lib/types";
import axios from "axios";
import { useState } from "react";

type AxiosMethod = "get" | "post" | "put" | "delete";

interface UseRequestProps {
  url: string;
  method: AxiosMethod;
  body: any;
}

const useRequest = ({ url, method, body }: UseRequestProps) => {
  const [errors, setErrors] = useState<React.ReactNode>(null);

  const doRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setErrors(null);
      const response = await axios[method](url, body);
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
