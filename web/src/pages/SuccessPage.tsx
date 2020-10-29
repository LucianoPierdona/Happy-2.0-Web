import React from "react";

import "../styles/pages/success-page.css";
import logoImg from "../assets/SuccessIcon.svg";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div id="success-page">
      <div className="content-block">
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <Link to="/map">Voltar para o Mapa</Link>
      </div>
      <img src={logoImg} alt="logo" />
    </div>
  );
};

export default SuccessPage;
