import React from "react";
import { FiArrowRight } from "react-icons/fi";
import logoImg from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import { LandingPage } from "../styles/pages/landing";

// Initial Page
const Landing = () => {
  const token = Cookie.getJSON("token");

  return (
    <LandingPage>
      <div className="content-wrapper">
        <div className="header-detail">
          <img src={logoImg} alt="logo" />
          <div className="header-text">
            <strong>Antônio Prado</strong>
            <p>Rio Grande do Sul</p>
          </div>
        </div>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="restricted-access">
          {token ? (
            <Link to="/restricted-access">Acesso Restrito</Link>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </div>

        <Link to="/map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </LandingPage>
  );
};

export default Landing;
