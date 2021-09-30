import express from "express";
import { Request, Response } from "express";
import { checkout } from "../controllers/order";

const router = express.Router();

router.get("/checkout", async (req: Request, res: Response) =>
  checkout(req, res)
);

module.exports = router;
