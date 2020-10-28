import React, { FormEvent, useState } from "react";

import Cookie from "js-cookie";
import api from "../services/api";

import jwt from "jsonwebtoken";
import { config } from "../utils/config";

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
  );
};

export default Login;
