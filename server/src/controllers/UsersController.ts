import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import * as Yup from "yup";
import bcrypt from "bcrypt";

export default {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const userRepository = getRepository(User);
    console.log(password);

    let hashedPassword =
      "$2b$05$0WnthlMcqsQljTcH9lQzZu9IZuPGrk5PycdtOJ5XYMrjQhx/qndA.";

    const saltRounds = 5;

    await bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return console.log(err);
      }

      console.log(hash);
      hashedPassword += hash;
      console.log(hashedPassword);
      return hashedPassword;
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
