import React, { FormEvent, useState } from "react";

import Cookie from "js-cookie";
import api from "../services/api";

import jwt from "jsonwebtoken";
import { config } from "../utils/config";

import logoImg from "../assets/Logotipo.svg";

import "../styles/pages/login.css";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    api.post("/login", data).then(async (res) => {
      const userToken = await jwt.sign(
        {
          username: data.email,
        },
        config.secret,
        {
          expiresIn: "10d",
        }
      );
      Cookie.set("token", userToken);
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
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Lembrar-me</label>
            </div>
            <Link to="/">Esqueci a Senha</Link>
          </div>
          <button type="submit" disabled onClick={onFormSubmit}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
