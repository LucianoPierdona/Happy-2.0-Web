import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

// Controllers
export default {
  // Orphanages
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  // Show a Specified Orphanage
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(orphanageView.render(orphanage));
  },

  // Show accepted orphanages
  async accepted(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    const acceptedArray = [] as Orphanage[];

    orphanages.map((orphanage) => {
      if (orphanage.is_accepted) {
        acceptedArray.push(orphanage);
      }
    });

    return res.json(orphanageView.renderMany(acceptedArray));
  },

  // Show pendents orphanages
  async pendents(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    const pendentsArray = [] as Orphanage[];

    orphanages.map((orphanage) => {
      if (!orphanage.is_accepted) {
        pendentsArray.push(orphanage);
      }
    });

    return res.json(orphanageView.renderMany(pendentsArray));
  },

  // Create a Single Orphanage
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      phone,
      open_on_weekends,
    } = req.body;
    const orphanagesRepository = getRepository(Orphanage);

    // Handle the orphanage image and save
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      phone,
      open_on_weekends: open_on_weekends === "true",
      images,
      is_accepted: false,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      phone: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },

  // Edit an orphanage
  async editOrphanage(req: Request, res: Response) {
    console.log(req.body);
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      phone,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    // Handle the orphanage image and save
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      phone,
      open_on_weekends: open_on_weekends === "true",
      images,
      is_accepted: true,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      phone: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    await orphanagesRepository.update(id, data);

    return res.status(201).json(data);
  },

  // Delete an orphanage
  async deleteOrphanage(req: Request, res: Response) {
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    await orphanagesRepository.delete(id);

    return res.status(201).json({ message: "excluido com sucesso" });
  },

  // accept and orphanage
  async acceptOrphanage(req: Request, res: Response) {
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    await orphanagesRepository.update(id, { is_accepted: true });

    return res.status(201).json({ message: "aceito com sucesso" });
  },
};
