import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from "yup";
import bcrypt from "bcrypt";
// import Cookie from "js-cookie";
// import jwt from "jsonwebtoken";
import { config } from "../config/token";

export default {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const saltRounds = 3;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return console.log(err);
      }

      const data = {
        username,
        email,
        password: hash,
      };

      const userRepository = getRepository(User);

      const schema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      // const userToken = await jwt.sign(
      //   {
      //     username: data.username,
      //   },
      //   config.secret,
      //   {
      //     expiresIn: "10d",
      //   }
      // );

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = userRepository.create(data);

      await userRepository.save(user);

      return res.status(201).json(user);
    });
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Não encontrado" });
    }

    const hash = user.password;

    // const userToken = await jwt.sign(
    //   {
    //     username: user.username,
    //   },
    //   config.secret,
    //   {
    //     expiresIn: "10d",
    //   }
    // );

    // console.log(userToken);

    // if (typeof window !== "undefined") {
    //   Cookie.set("token", userToken);
    // }

    await bcrypt.compare(password, hash).then(function (result) {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Usuário ou Senha errados, tente novamente!" });
      }

      return res.status(200).json({ message: "entrou com sucesso" });
    });
  },
};
