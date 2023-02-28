import { useMutation, useQueryClient } from "react-query";
import { MakeRequest } from "./Utilities";
import type { JobModelDto } from "../DTOs/JobDTO";

export const RegisterModelToJob = async (data: JobModelDto) =>
{
  return await MakeRequest(
  {
    url: `Jobs/${data.jobId}/model/${data.modelId}`,
    method: "POST",
    data: data,
  });
};

export const AddModelToJob = () =>
{
  const queryClient = useQueryClient();
  return useMutation(RegisterModelToJob,
  {
    onSuccess: () =>
    {
      console.log("A model has successfully been added to the job");
    },
    onError: (error) =>
    {
      console.log((error as any).message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("jobsKey");
    },
  });
};
