import { useMutation } from "react-query";
import { MakeRequest } from "./Utilities";
import { ExpenseDto } from "../DTOs/ExpenseDTO";

export const RegisterExpense = async (data: ExpenseDto) =>
{
  return await MakeRequest({
    url: `expenses`,
    method: "POST",
    data: data,
  });
};

export const useExpense = () =>
{
  return useMutation(RegisterExpense,
    {
    onSuccess: () =>
    {
      console.log("An expense has successfully been added");
    },
    onError: (error) =>
    {
      console.log((error as any).message);
    },
  });
};
