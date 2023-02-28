import GetJobs from "../APIs/GetJob";
import AddExpense from "../Components/AddExpense";
import JobList from "../Components/GetJobList";

const Model = () =>
{
  const { data: jobsData} = GetJobs();
  console.log("job ", jobsData);

  return (
    <>
        <AddExpense />
        <JobList jobList={jobsData?.data} />
    </>
  );
};

export default Model;
