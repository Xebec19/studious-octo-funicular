import express from "express";
import { decodeToken } from "./libs/decodeToken";
import { updateLastAccess } from "./utils/updateLastAccess";
const app = express();
const port = process.env.port || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", updateLastAccess, require("./routes/public"));
app.use("/cart", decodeToken, updateLastAccess, require("./routes/cart"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
