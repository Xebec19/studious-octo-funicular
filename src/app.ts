import parseArgs from "minimist";
import cors from "cors";
import express from "express";
import { decodeToken } from "./libs/decodeToken";
import { updateLastAccess } from "./utils/updateLastAccess";
import { seedingFunc } from "./controllers/misl";

const app = express();

const argv = parseArgs(process.argv.slice(2)).seed || false;
console.log('--seeding enabled : ',argv);
if(argv){
  seedingFunc();
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/public", require("./routes/public"));
app.use("/cart", decodeToken, updateLastAccess, require("./routes/cart"));
app.use("/order", decodeToken, updateLastAccess, require("./routes/order"));

export default app;