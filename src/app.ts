import parseArgs from "minimist";
import cors from "cors";
import express from "express";
import { decodeToken } from "./libs/decodeToken";
import { updateLastAccess } from "./utils/updateLastAccess";
import { seed } from "./controllers/misl";

const app = express();
const port = process.env.port || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/public", require("./routes/public"));
app.use("/cart", decodeToken, updateLastAccess, require("./routes/cart"));
app.use("/order", decodeToken, updateLastAccess, require("./routes/order"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
