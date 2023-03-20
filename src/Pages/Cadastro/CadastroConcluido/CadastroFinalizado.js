import React from "react";
import {
  SectionSucesso,
  SucessoBotaoEmail,
  SucessoChecar,
  SucessoImagem,
  SucessoParagrafo,
  SucessoSubTitulo,
  SucessoTitulo,
} from "./StyleConcluido";
import ImagemSucesso from "../../../Images/Finalizado.png";
import { useSearchParams } from "react-router-dom";

const CadastroFinalizado = () => {
  const [searchEmail] = useSearchParams();
  const email = searchEmail.get("q");
  const [provedorEmail, setProvedorEmail] = React.useState();
  React.useEffect(() => {
    if (email.includes("gmail")) {
      setProvedorEmail(
        "https://accounts.google.com/v3/signin/identifier?dsh=S-1794342733%3A1679320174485988&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AWnogHddXF2Kegu99mBDgf2LoLRWEPNhHMpw5_L2EcMHRqXQkOc2mFdcsQwFiF5NVrgH0KP0GSHfdQ&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
      );
    } else if (email.includes("outlook") || email.includes("hotmail")) {
      setProvedorEmail(
        "https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1679320302&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%3d7c53d08b-666f-f75e-bd47-3db14eb7fce8&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015"
      );
    } else if (email.includes("yahoo")) {
      setProvedorEmail(
        "https://login.yahoo.com/?.lang=pt-BR&.intl=br&src=homepage&.done=https%3A%2F%2Fbr.yahoo.com%2F&pspid=2142170772&activity=ybar-signin"
      );
    }
  }, [email]);
  return (
    <SectionSucesso>
      <SucessoTitulo>Cadastrado!</SucessoTitulo>
      <SucessoSubTitulo>Aguardando confirmação de e-mail!</SucessoSubTitulo>
      <SucessoParagrafo>
        Agora você precisa{" "}
        <SucessoBotaoEmail href={provedorEmail} target="_blank">
          confirmar o seu e-mail,
        </SucessoBotaoEmail>{" "}
        para isso cheque sua caixa de entrada e confirme seu email.
        <SucessoChecar>(Checar também o Span)</SucessoChecar>
      </SucessoParagrafo>
      <SucessoImagem src={ImagemSucesso} alt="imagem concluído" />
    </SectionSucesso>
  );
};

export default CadastroFinalizado;
