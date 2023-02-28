import { useMutation } from "react-query";
import { MakeRequest } from "./Utilities";
import type { ModelRegisterDto } from "../DTOs/ModelDTO";

export const RegisterModel = async (data: ModelRegisterDto) =>
{
  return await MakeRequest(
  {
    url: `Models`,
    method: "POST",
    data: data,
  });
};

export const AddModel = () =>
{
  return useMutation(RegisterModel,
  {
    onSuccess: () =>
    {
      console.log("A model has successfully been added");
    },
    onError: (error) =>
    {
      console.log((error as any).message);
    },
  });
};
