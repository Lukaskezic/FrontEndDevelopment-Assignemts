import { useMutation } from "react-query";
import { MakeRequest } from "./Utilities";
import JwtParser from "./jwtParse";
import UseAuthentication from "../Authentication/UseAuthentication";
import { useNavigate } from "react-router-dom";
import type { AccountLoginDto } from "../DTOs/AccountDTO";

export const RegisterLogin = async (data: AccountLoginDto) =>
{
  localStorage.setItem("user", data.email);
  localStorage.setItem("Password", data.password);
  const response = await MakeRequest(
  {
    url: `account/login`,
    method: "POST",
    data: data,
  });

  return response;
};

export const AddLogin = () =>
{
  const { setAuth } = UseAuthentication();

  const navigate = useNavigate();

  return useMutation(RegisterLogin,
    {
    onSuccess: (account) =>
    {
      const accessToken = account.data.jwt;
      const role = JwtParser(account.data.jwt)[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
      localStorage.setItem("token", account.data.jwt);
      console.log(role);
      localStorage.setItem("role", role);

      const User = localStorage.getItem("user");
      const Pass = localStorage.getItem("Password");

      setAuth([User, Pass, role, accessToken]);
      console.log(User + " has logged in");
    },
    onError: (error) =>
    {
      console.log("Log In failed, try again");
      console.log((error as any).message);
    },
    onSettled: () =>
    {
      const role = localStorage.getItem("role");
      navigate("/" + role);
    },
  });
};
