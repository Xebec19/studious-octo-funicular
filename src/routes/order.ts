import express from "express";
import { Request, Response } from "express";
import { checkout, createOrder } from "../controllers/order";

const router = express.Router();

router.post("/checkout", async (req: Request, res: Response) =>
  checkout(req, res)
);

router.post("/create_order", async (req: Request, res: Response) =>
  createOrder(req, res)
);

module.exports = router;
