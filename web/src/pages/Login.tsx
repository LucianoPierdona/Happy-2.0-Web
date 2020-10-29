import React, { FormEvent, useEffect, useState } from "react";

import Cookie from "js-cookie";
import api from "../services/api";

import jwt from "jsonwebtoken";
import { config } from "../utils/config";

import "../styles/pages/login.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormBanner from "../components/FormBanner";

const Login = () => {
  const history = useHistory();
  // See if the user is already logged in
  Cookie.get("token") && history.push("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    email.length > 0 && email.includes("@")
      ? setIsEnabled(false)
      : setIsEnabled(true);
    password.length > 0 ? setIsEnabled(true) : setIsEnabled(false);
  }, [email, password]);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    api
      .post("/login", data)
      .then(async (res) => {
        const userToken = await jwt.sign(
          {
            email: data.email,
          },
          config.secret,
          {
            expiresIn: rememberMe ? "10d" : "1d",
          }
        );
        setErrorMessage("");
        await Cookie.set("token", userToken);
        history.push("/");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setErrorMessage("usuário e/ou senha errados.");
        }
      });
  };

  return (
    <>
      <Link to="/" className="go-back">
        <FiArrowLeft color="#15C3D6" size={20} />
      </Link>
      <FormBanner />
      <div className="banner-right">
        <form>
          <h1>Fazer Login!</h1>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="subtitles">
            <div>
              <input
                type="checkbox"
                name="remember"
                onClick={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <label htmlFor="remember">Lembrar-me</label>
            </div>
            <Link to="/forgot-password">Esqueci a Senha</Link>
          </div>
          <p className="error">{errorMessage ? errorMessage : null}</p>
          <button type="submit" disabled={!isEnabled} onClick={onFormSubmit}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
