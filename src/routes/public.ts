import express from "express";
import { Request, Response } from "express";
import { login, logout, register } from "../controllers/auth";
import {
  fetchCategories,
  fetchProducts,
  productDetail,
} from "../controllers/products";

const router = express.Router(); 

router.post("/register", async (req: Request, res: Response) =>
  register(req, res)
);
router.post("/login", async (req: Request, res: Response) => login(req, res));
router.get("/fetchProducts", async (req: Request, res: Response) =>
  fetchProducts(req, res)
);
router.get("/productDetail", async (req: Request, res: Response) =>
  productDetail(req, res)
);
router.get("/category", async (req: Request, res: Response) =>
  fetchCategories(req, res)
);
router.get("/logout", async (req: Request, res: Response) => logout(req, res));

module.exports = router;
