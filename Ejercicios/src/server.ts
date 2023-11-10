import express from "express";
import "express-async-errors";
import morgan from "morgan";
import 'dotenv/config'

type Planet = {
    id: number;
    name: string;
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

const app = express();
const port = process.env.PORT ;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json(planets);
});

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
