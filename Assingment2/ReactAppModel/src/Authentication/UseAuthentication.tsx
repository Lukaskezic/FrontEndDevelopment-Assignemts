import { useContext } from "react";
import AuthContext from "./ProvideAuthentication";

const UseAuthentication = () =>
{
  return useContext<any>(AuthContext);
};

export default UseAuthentication;
