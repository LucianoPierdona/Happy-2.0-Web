import express from "express";
import "express-async-errors";
import "./database/connection";
import routes from "./routes";
import path from "path";
import cors from "cors";
import errorHandler from "./errors/handler";

// Basic Setup
const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
