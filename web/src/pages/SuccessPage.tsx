import React from "react";

import logoImg from "../assets/SuccessIcon.svg";
import { Link } from "react-router-dom";

import { SuccessPageBlock } from "../styles/pages/success";

const SuccessPage = () => {
  return (
    <SuccessPageBlock>
      <div className="content-block">
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <Link to="/map">Voltar para o Mapa</Link>
      </div>
      <img src={logoImg} alt="logo" />
    </SuccessPageBlock>
  );
};

export default SuccessPage;
