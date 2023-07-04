import express from "express";
import * as dotenv from "dotenv";
import { create, destroy, index, store } from "./controllers/client";
import bodyParser from "body-parser";
import { clientInputCheck } from "./utility/validator";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello, World ✌️" });
});

app.get("/clients", index);
app.get("/client/create", create);
app.post("/client", clientInputCheck(), store);
app.post("/client/delete/:id", destroy);

// @ts-ignore
const { APP_PORT: port } = process.env || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
