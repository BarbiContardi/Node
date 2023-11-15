import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
import Joi from "joi";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT;

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

const planetScheme = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
