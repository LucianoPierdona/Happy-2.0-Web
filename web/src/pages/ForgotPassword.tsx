import React, { FormEvent, useEffect, useState } from "react";
import "../styles/pages/forgot-password.css";

import FormBanner from "../components/FormBanner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    email.length > 0 && email.includes("@")
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [email]);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <FormBanner />
      <div className="banner-right">
        <form>
          <h2>Esqueci a senha</h2>
          <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={isDisabled} onSubmit={onFormSubmit}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
