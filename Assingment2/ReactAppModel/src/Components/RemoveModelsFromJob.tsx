import { ChangeEvent, useState } from "react";
import { RemoveModelFromJob } from "../APIs/RemoveModelFromJob";
import type { JobModelDto } from "../DTOs/JobDTO";
import { Button, TextInput, Label } from "flowbite-react";

const RemoveModel = () =>
{
  const { mutate: register } = RemoveModelFromJob();
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
    <div className="border border-black bg-white overflow-hidden shadow-lg grid p-4 justify-left">
      <div className="grid grid-col">
        <form className="grid grid-wrap">
          <div className="grid grid-col mx-3">
            <Label>Model Id</Label>
            <TextInput type="number" required  placeholder="560" value={modelId}
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
            <Button onClick={handleOnSubmit}>Remove Model from Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RemoveModel;
