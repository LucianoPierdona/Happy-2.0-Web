import React, { FormEvent, useEffect, useState } from "react";

import FormBanner from "../components/FormBanner";
import api from "../services/api";

import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { BannerRight } from "../styles/pages/form-fields";
import { config } from "../utils/config";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    email.length > 0 && email.includes("@")
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [email]);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
    };

    api
      .post("/forgot-password", data)
      .then(async (res) => {
        console.log("TESTE");
        if (res.data.error) {
          return setErrorMessage(res.data.error);
        }

        setErrorMessage("");
        const userToken = await jwt.sign(
          {
            email,
          },
          config.secret,
          {
            expiresIn: "1h",
          }
        );

        await Cookie.set("password-token", userToken);
        alert("Um email de confirmação foi enviado para o seu e-mail");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ flexDirection: "row" }}>
      <FormBanner />
      <BannerRight>
        <form onSubmit={onFormSubmit}>
          <h2>Esqueci a senha</h2>
          <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>{errorMessage}</p>
          <button type="submit" disabled={isDisabled}>
            Enviar
          </button>
        </form>
      </BannerRight>
    </div>
  );
};

export default ForgotPassword;
