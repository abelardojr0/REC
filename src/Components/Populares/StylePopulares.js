import styled from "styled-components";

export const PopularesContainer = styled.article`
  background-color: #424150;
  width: 100%;
  height: 600px;
`;
export const PopularContainerConteudo = styled.section`
  width: 1200px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
export const PopularTituloSection = styled.h1`
  font-size: 3rem;
  color: #01172e;
  font-weight: bold;
  width: 100%;
  justify-self: flex-start;
  align-items: flex-start;
  padding-top: 10px;
  margin-left: 30px;
`;
export const PopularesContainerLista = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  gap: 20px;
`;

export const PopularCard = styled.div`
  width: 180px;
  height: 450px;
  background-color: #17181d;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  &:hover {
    transform: scale(1.1);
  }
`;

export const PopularCardImagem = styled.img`
  align-self: flex-start;
  width: 100%;
  height: 60%;
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;
`;

export const PopularDivDasEstrelas = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PopularCardContainerNota = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
  gap: 5px;
  img {
    max-width: 25px;
    max-height: 25px;
    align-self: center;
  }
  p {
    font-size: 1rem;
    color: #605c6c;
  }
`;
export const PopularFavorito = styled.img`
  max-width: 20px;
  justify-self: flex-end;
  align-items: flex-end;
  cursor: pointer;
  padding: 0.2rem;
  margin-top: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    box-sizing: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
`;

export const PopularContainerInfos = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5px;
`;
export const PopularTitulo = styled.h1`
  font-size: 1.2rem;
  color: #e2e2e2;
  margin-left: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
export const PopularAdicionar = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 0.4rem 0.8rem;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  img {
    max-width: 30px;
    align-self: center;
  }
`;
export const PopularAdicionarTexto = styled.p`
  color: #005da8;
  font-size: 1.2rem;
`;
