import React, { FormEvent, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

import FormBanner from "../components/FormBanner";
import { BannerRight } from "../styles/pages/form-fields";
import api from "../services/api";

interface urlParams {
  email: string;
}

const ChangePassword = () => {
  const history = useHistory();
  const { email } = useParams<urlParams>();
  const token = Cookie.getJSON("password-token");

  const [isDisabled, setIsDisabled] = useState(true);
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const emailToken: any = jwt.decode(token);
    if (email !== emailToken?.email) {
      history.push("/");
    }
    if (firstPassword === secondPassword && firstPassword.length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstPassword, secondPassword, history, email, token]);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      password: firstPassword,
      email,
    };
    api.post("/change-password", data).then(async (res) => {
      if (res.data.error) {
        return setErrorMessage(res.data.error);
      }

      alert("senha atualizada com sucesso!");
      await Cookie.remove("password-token");
      history.push("/");
    });
  };

  return (
    <div style={{ flexDirection: "row" }}>
      <FormBanner />
      <BannerRight>
        <form onSubmit={onFormSubmit}>
          <h2>Mudar Senha</h2>
          <p>Complete os campos abaixo para mudar sua senha.</p>
          <label htmlFor="password">Digite a nova senha:</label>
          <input
            type="password"
            value={firstPassword}
            onChange={(e) => setFirstPassword(e.target.value)}
          />
          <label htmlFor="password">Confirme a senha:</label>
          <input
            type="password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
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

export default ChangePassword;
