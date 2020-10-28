import React, { FormEvent, useEffect, useState } from "react";

import Cookie from "js-cookie";
import api from "../services/api";

import jwt from "jsonwebtoken";
import { config } from "../utils/config";

import logoImg from "../assets/Logotipo.svg";

import "../styles/pages/login.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    email.length > 0 && email.includes("@")
      ? setEnableButton(true)
      : setEnableButton(false);
    password.length > 0 ? setEnableButton(true) : setEnableButton(false);
  }, [email, password]);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    console.log(rememberMe);
    api
      .post("/login", data)
      .then(async (res) => {
        const userToken = await jwt.sign(
          {
            username: data.email,
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
      <div className="banner-left">
        <img src={`${logoImg}`} alt="logo Happy" />
        <div className="location">
          <strong>Antônio Prado</strong>
          <p>Rio Grande Do Sul</p>
        </div>
      </div>
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
            <Link to="/">Esqueci a Senha</Link>
          </div>
          <p className="error">{errorMessage ? errorMessage : null}</p>
          <button type="submit" disabled={!enableButton} onClick={onFormSubmit}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
