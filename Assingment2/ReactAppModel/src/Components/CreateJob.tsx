import { useState } from "react";
import { ChangeEvent } from "react";
import type { JobRegisterDto } from "../DTOs/JobDTO";
import { AddJob } from "../APIs/PostJob";
import { Button, Label, TextInput } from "flowbite-react";

export default function CreateJob()
{
  const [customer, setCustomer] = useState("");
  const [startdate, NewStartDate] = useState("");
  const [days, NewDays] = useState<number>(0);
  const [location, NewLocation] = useState("");
  const [comments, NewComments] = useState("");

  const { mutate: register } = AddJob();

  const handleSubmit = () =>
  {
    const job: JobRegisterDto =
    {
      customer: customer,
      startdate: startdate,
      days: days,
      location: location,
      comments: comments,
    };
    register(job);
  };

  return (
    <div className="border rounded border-black bg-white overflow-hidden shadow-lg grid p-4 justify-left">
      <div className="grid grid-col">
        <form className="grid grid-wrap">
          <div className="grid grid-col mx-3">
            <Label>Customer</Label>
            <TextInput type="text" required placeholder="Name" value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Start Date</Label>
            <TextInput type="date" required placeholder="Start Date" value={startdate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewStartDate(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Days</Label>
            <TextInput type="number" required placeholder="0" value={days} min={0} max={365}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewDays(e.target.valueAsNumber)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Location</Label>
            <TextInput type="text" required placeholder="Name" value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewLocation(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label> Comments</Label>
            <TextInput type="text" required placeholder="Comments" value={comments}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                NewComments(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Submit</Label>
            <Button onClick={handleSubmit}>Create a Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
