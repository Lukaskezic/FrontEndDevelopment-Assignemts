import GetJobs from "../APIs/GetJob";
import CreateManager from "../Components/CreateManager";
import CreateModel from "../Components/CreateModel";
import CreateJob from "../Components/CreateJob";
import AddModel from "../Components/AddModel";
import JobList from "../Components/GetJobList";
import RemoveModel from "../Components/RemoveModelsFromJob";

const Mananger = () =>
{
  const { data: jobsData } = GetJobs();
  console.log("job ", jobsData);

  return (
    <>
        <CreateManager />
        <CreateJob />
        <AddModel />
        <CreateModel />
        <RemoveModel />
        <JobList jobList={jobsData?.data} />
    </>
  );
};

export default Mananger;
