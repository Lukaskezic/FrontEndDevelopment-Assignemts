import { useQuery } from "react-query";
import { MakeRequest } from "./Utilities";

const FetchJobs = async () =>
{
  const response = await MakeRequest(
    {
       url: "jobs", method: "get"
    });

  if (response.status === 304)
  {
    throw new Error("Fetching problem with job");
  }
  return response;
};

const GetJobs = () =>
{
  return useQuery("jobsKey", FetchJobs,
  {
    refetchOnWindowFocus: false,
  });
};

export default GetJobs;