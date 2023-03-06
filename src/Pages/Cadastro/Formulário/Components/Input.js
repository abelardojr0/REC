import React from "react";
import { LabelInput, InputComponent, InputContainer } from "./StylesInput";

const Input = ({
  htmlFor,
  texto,
  tipo,
  nome,
  id,
  tamanho,
  placeholder,
  setDados,
}) => {
  const [focus, setFocus] = React.useState("");
  function inputFocado() {
    setFocus("ativo");
  }
  function inputDesfocado(e) {
    if (e.target.value.length > 0) {
      return;
    } else {
      setFocus("");
    }
  }
  function atualizar(e) {
    setDados(e.target.value);
  }
  return (
    <>
      <>
        <InputContainer>
          <InputComponent
            className={tamanho}
            type={tipo}
            name={nome}
            id={id}
            placeholder={placeholder}
            required
            onFocus={inputFocado}
            onBlur={inputDesfocado}
            onChange={atualizar}
          />
          <LabelInput className={focus} htmlFor={htmlFor}>
            {texto}
          </LabelInput>
        </InputContainer>
      </>
    </>
  );
};

export default Input;
