import React from "react";

import "../styles/components/form-banner.css";
import logoImg from "../assets/Logotipo.svg";

const FormBanner = () => {
  return (
    <>
      <div className="banner-left">
        <img src={`${logoImg}`} alt="logo Happy" />
        <div className="location">
          <strong>Antônio Prado</strong>
          <p>Rio Grande Do Sul</p>
        </div>
      </div>
    </>
  );
};

export default FormBanner;
