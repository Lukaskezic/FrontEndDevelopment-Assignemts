import { ChangeEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import type { AccountLoginDto } from "../DTOs/AccountDTO";
import { AddLogin } from "../APIs/PostLogin";

const Login = () =>
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = AddLogin();

  const handleSubmit = (e: any) =>
  {
    e.preventDefault();
    const userLogin: AccountLoginDto =
    {
      email: email,
      password: password,
    };
    login(userLogin);
  };
  return (
    <div className="flex justify-center border-4 rounded border-black-500 py-4">
      <form className="flex flex-col items-center">
        <div className="flex flex-col items-center py-2">
          <Label className="mx-4 pb-2">Email</Label>
          <TextInput type="email" required placeholder="mikedean@mail.com" value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col items-center py-2">
          <Label className="mx-4 pb-2">Password</Label>
          <TextInput type="Password" required placeholder="********" value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="flex justify-center py-2">
          <Button onClick={handleSubmit}>Log in</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
