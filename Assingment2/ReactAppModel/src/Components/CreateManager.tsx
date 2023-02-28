import { ChangeEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import type { ManagerRegisterDto } from "../DTOs/ManagerDTO";
import { AddManager } from "../APIs/PostManager";

const CreateManager = () =>
{
  const { mutate: register } = AddManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = () => {
    const manager: ManagerRegisterDto =
    {
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname,
    };
    register(manager);
  };
  return (
    <div className="border rounded border-black bg-white overflow-hidden shadow-lg grid p-4 justify-left">
      <div className="grid grid-col">
        <form className="grid grid-wrap">
          <div className="grid grid-col mx-3">
            <Label>First name</Label>
            <TextInput type="text" required placeholder="Mike" value={firstname}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Last name</Label>
            <TextInput type="text" required placeholder="Dean" value={lastname}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Email</Label>
            <TextInput type="email" required placeholder="mikedean@mail.com" value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Password</Label>
            <TextInput type="password" required placeholder="******" value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div className="grid grid-col mx-3">
            <Label>Submit</Label>
            <Button onClick={handleSubmit}>Create a Manager</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManager;
