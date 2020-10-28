import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from "yup";
import bcrypt from "bcrypt";

export default {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const userRepository = getRepository(User);

    const saltRounds = 5;

    const hashedPassword = bcrypt.hash(password, saltRounds, function (
      err,
      hash
    ) {
      if (err) {
        return console.log(err);
      }

      return `${hash}`;
    });

    const data = {
      username,
      email,
      password: hashedPassword,
    };

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);

    await userRepository.save(user);

    return res.status(201).json(user);
  },
};
