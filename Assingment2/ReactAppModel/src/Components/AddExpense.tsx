import { ChangeEvent, useState } from "react";
import { useExpense } from "../APIs/PostExpense";
import { ExpenseDto } from "../DTOs/ExpenseDTO";
import { Button, TextInput, Label } from "flowbite-react";

const AddExpense = () =>
{
  const { mutate: expense } = useExpense();
  const [modelId, NewModelId] = useState<number>(0);
  const [jobId, NewJobId] = useState<number>(0);
  const [amount, NewAmount] = useState<number>(0);
  const [date, NewDate] = useState<string>("");
  const [textValue, NewTextValue] = useState<string>("");

  const handleOnSubmit = () =>
  {
    const expenseDto: ExpenseDto =
    {
      modelId: modelId,
      jobId: jobId,
      date: date,
      text: textValue,
      amount: amount,
    };
    expense(expenseDto);
  };

  return (
    <div className="border rounded border-black bg-white overflow-hidden shadow-lg flex p-4 justify-left">
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
          <Label>Text</Label>
          <TextInput type="text" required placeholder="Text" value={textValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              NewTextValue(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col mx-3">
          <Label>Date</Label>
          <TextInput type="date" required placeholder="2022-12-03T20:42:51.203Z" value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              NewDate(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col mx-3">
          <Label>Amount</Label>
          <TextInput required type="number" placeholder="356" value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              NewAmount(e.target.valueAsNumber)
            }
          />
        </div>
        <div className="flex flex-col mx-3">
          <Label>Submit</Label>
          <Button onClick={handleOnSubmit}>Add Expense To Job</Button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;