import { Request, Response } from "express";
import Joi from "joi";
import { db } from "../db.js";

const planetScheme = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  const { id, name } = req.body;
  const newPlanet = { id, name };

  const validateNewPlanet = planetScheme.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message });
  } else {
    res.status(201).json({ msg: "el pleneta se creo con exito" });
  }
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200).json({ msg: "El planeta se actualizo" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "El planeta fue eliminado" });
};

const createImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fileName = req.file?.path;
  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
    res.status(201).json({ msg: "La imagen se cargo correctamente" });
  } else {
    res.status(400).json({ msg: "La imagen no se cargo" });
  }
};

export { getAll, getById, create, updateById, deleteById, createImage };
