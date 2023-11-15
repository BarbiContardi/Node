import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
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

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
