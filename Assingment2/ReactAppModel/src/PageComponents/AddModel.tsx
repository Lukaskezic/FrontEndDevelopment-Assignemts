import { ChangeEvent, useState } from "react";
import { AddModelToJob } from "../APIs/PostAddModelToJob";
import type { JobModelDto } from "../DTOs/JobDTO";
import { Button, TextInput, Label } from "flowbite-react";

const AddModel = () =>
{
  const { mutate: register } = AddModelToJob();
  const [modelId, NewModelId] = useState<number>(0);
  const [jobId, NewJobId] = useState<number>(0);

  const handleOnSubmit = () =>
  {
    const expenseDto: JobModelDto =
    {
      modelId: modelId,
      jobId: jobId,
    };
    register(expenseDto);
  };
  return (
    <div className="border rounded border-grey-400 bg-white overflow-hidden shadow-lg flex p-4 justify-left">
      <div className="flex flex-col">
        <form className="flex flex-wrap">
          <div className="flex flex-col mx-3">
            <Label>Model Id</Label>
            <TextInput type="number" required placeholder="560" value={modelId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewModelId(e.target.valueAsNumber)
              }
            />
          </div>

          <div className="flex flex-col mx-3">
            <Label>Job Id</Label>
            <TextInput type="number" required placeholder="560" value={jobId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewJobId(e.target.valueAsNumber)
              }
            />
          </div>
          <div className="flex flex-col mx-3">
            <Label>Submit</Label>
            <Button onClick={handleOnSubmit}>Add Model To Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
