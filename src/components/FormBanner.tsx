import React from "react";

import logoImg from "../assets/Logotipo.svg";
import { BannerLeft } from "../styles/components/form-banner";

const FormBanner = () => {
  return (
    <BannerLeft>
      <img src={`${logoImg}`} alt="logo Happy" />
      <div className="location">
        <strong>Antônio Prado</strong>
        <p>Rio Grande Do Sul</p>
      </div>
    </BannerLeft>
  );
};

export default FormBanner;
