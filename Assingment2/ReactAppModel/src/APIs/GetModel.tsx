import { useQuery } from "react-query";
import { MakeRequest } from "./Utilities";

const FetchModels = async () =>
{
  const response = await MakeRequest(
  {
      url: "models", method: "get"
  });

  if (response.status === 304)
  {
    throw new Error("Fetching problem with models");
  }
  return response;
};


const GetModels = () =>
{
  return useQuery("modelsKey", FetchModels,
  {
    refetchOnWindowFocus: false,
  });
};

export default GetModels;