import { useState } from "react";
import { axiosInstance as axios } from "../utils/config";
import { AxiosError, AxiosResponse } from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const request = async (url: string, method: string, body:any) => {
    setIsLoading(true);
    try {
      let response: AxiosResponse;
      if (method === "GET") {
        response = await axios.get(url);
      } else if (method === "POST") {
        response = await axios.post(url, body);
      } else if (method === "PUT") {
        response = await axios.put(url);
      } else if (method === "DELETE") {
        response = await axios.delete(url);
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }
      console.log(response);
      setData(response.data);
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { request, data, error, isLoading };
};

export default useHttp;
