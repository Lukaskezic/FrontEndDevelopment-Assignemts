import { useMutation } from "react-query";
import { MakeRequest } from "./Utilities";
import type { JobModelDto } from "../DTOs/JobDTO";

export const RegisterModelFromJob = async (data: JobModelDto) =>
{
  return await MakeRequest(
  {
    url: `Jobs/${data.jobId}/model/${data.modelId}`,
    method: "DELETE",
    data: data,
  });
};

export const RemoveModelFromJob = () =>
{
  return useMutation(RegisterModelFromJob,
  {
    onSuccess: () =>
    {
      console.log("A model has successfully been removed from a job");
    },
    onError: (error) => 
    {
      console.log((error as any).message);
    },
  });
};
