import express from "express";
import { Request, Response } from "express";
import { addToCart, readCart, removeItem } from "../controllers/cart";

const router = express.Router();

router.post("/add_item", async (req: Request, res: Response) =>
  addToCart(req, res)
);
router.get("/read_cart", async (req: Request, res: Response) =>
  readCart(req, res)
);
router.post("/remove_item", async (req: Request, res: Response) =>
  removeItem(req, res)
);

module.exports = router;
