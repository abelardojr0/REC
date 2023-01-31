import React from "react";
import { LogarComSociais } from "./StyleLoginComSociais";

const LoginComSociais = ({ social }) => {
  return (
    <LogarComSociais>
      <img src={social} alt={"rede social"} />{" "}
    </LogarComSociais>
  );
};

export default LoginComSociais;
