import React from "react";
import {
  SectionSucesso,
  SucessoImagem,
  SucessoParagrafo,
  SucessoSubTitulo,
  SucessoTitulo,
} from "./StyleConcluido";
import ImagemSucesso from "../../../Images/CadastroFinalizado.png";
const CadastroConcluido = () => {
  return (
    <SectionSucesso>
      <SucessoTitulo>Sucesso!</SucessoTitulo>
      <SucessoSubTitulo>Você finalizou seu cadastro!</SucessoSubTitulo>
      <SucessoParagrafo>
        Caso deseje editar informações ou atualizá-las no futuro, é só acessar a
        página de perfil!
      </SucessoParagrafo>
      <SucessoImagem src={ImagemSucesso} alt="imagem concluído" />
    </SectionSucesso>
  );
};
export default CadastroConcluido;
