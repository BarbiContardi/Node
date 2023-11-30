import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:avril123@localhost:5432/postgres");
console.log(db)
const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL)`)
await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
}
setupDb();

const planetScheme = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`)
  res.status(200).json(planets);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
  res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`)
  const { id, name } = req.body;
  const newPlanet = { id, name };

  const validateNewPlanet = planetScheme.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
  } else {
    res.status(201).json({ msg: "el pleneta se creo con exito" });
  }
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])

  res.status(200).json({ msg: "El planeta se actualizo" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "El planeta fue eliminado" });
};

export { getAll, getById, create, updateById, deleteById };
