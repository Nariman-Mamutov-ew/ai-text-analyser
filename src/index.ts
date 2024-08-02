import "dotenv/config";
import express from "express";

import { textAnalyser } from "./text-analyser";

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.post("/text-analyser", textAnalyser);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
