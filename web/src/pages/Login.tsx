import React, { FormEvent, useState } from "react";

import Cookie from "js-cookie";
import api from "../services/api";

import jwt from "jsonwebtoken";
import { config } from "../utils/config";

import logoImg from "../assets/Logotipo.svg";

import "../styles/pages/login.css";

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
      <div className="banner-left">
        <img src={`${logoImg}`} alt="logo Happy" />
        <div className="location">
          <strong>Antônio Prado</strong>
          <p>Rio Grande Do Sul</p>
        </div>
      </div>
      <div className="banner-right">
        <form>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit" onClick={onFormSubmit}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
