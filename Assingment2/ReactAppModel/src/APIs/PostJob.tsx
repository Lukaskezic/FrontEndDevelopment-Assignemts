import { useMutation } from "react-query";
import { MakeRequest } from "./Utilities";
import type { JobRegisterDto } from "../DTOs/JobDTO";

export const RegisterJob = async (data: JobRegisterDto) => 
{
  return await MakeRequest(
  {
    url: `Jobs`,
    method: "POST",
    data: data,
  });
};

export const AddJob = () => 
{
  return useMutation(RegisterJob, 
  {
    onSuccess: () => 
    {
      console.log("A job has successfully been added");
    },
    onError: (error) => 
    {
      console.log((error as any).message);
    },
  });
};
