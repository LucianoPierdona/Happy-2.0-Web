import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from "yup";
import bcrypt from "bcrypt";
import mailer from "../modules/mailer";

export default {
  // Register an user
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const saltRounds = 3;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "houve algum erro, tente novamente" });
      }

      const data = {
        username,
        email,
        password: hash,
        admin_rights: false,
      };

      const userRepository = getRepository(User);

      const schema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        admin_rights: Yup.boolean().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = userRepository.create(data);

      await userRepository.save(user);

      return res.status(201).json(user);
    });
  },

  // Login a user
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Não encontrado" });
    }

    const hash = user.password;

    await bcrypt.compare(password, hash).then(function (result) {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Usuário ou Senha errados, tente novamente!" });
      }

      return res.status(200).json({ message: "entrou com sucesso" });
    });
  },

  // show a single user
  async show(req: Request, res: Response) {
    const { email } = req.params;

    const userRepository = getRepository(User);

    const userDB = await userRepository.findOne({
      where: { email },
    });

    const { username, admin_rights }: any = userDB;

    return res.send({ user: { username, admin_rights } });
  },

  // send an email to change password
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(400).send({ error: "Usuário não encontrado" });
      }

      await mailer
        .sendMail({
          to: email,
          from: "piersgroup@gmail.com",
          subject: "Forgot Password",
          html: `<a href="http://localhost:3000/change-password/${email}">Clique aqui para mudar sua senha</a>`,
        })
        .catch((err) => {
          console.log(err);
        });

      return res.send(200).send({ message: "email enviado com sucesso" });
    } catch (err) {
      res.status(400).json({ error: "Error on forgot password, try again" });
    }
  },

  // change the user password
  async changePassword(req: Request, res: Response) {
    const { password, email } = req.body;
    const userRepository = getRepository(User);

    const saltRounds = 3;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "houve algum erro, tente novamente" });
      }

      try {
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
          return res.status(400).json({ error: "usuário não encontrado" });
        }

        await userRepository.update(user.id, { password: hash });

        return res
          .status(201)
          .json({ message: "senha atualizada com sucesso!" });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Aconteceu algum erro, tente novamente" });
      }
    });
  },
};
