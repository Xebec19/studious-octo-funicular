import express from 'express'
import { Request, Response } from 'express';
import { login, register } from '../controllers/auth';
import { fetchProducts } from '../controllers/products';

const router = express.Router();

router.post('/register', async(req: Request, res: Response) => register(req, res));
router.post('/login', async(req: Request, res: Response) => login(req, res));
router.post('/fetchProducts',async(req:Request,res:Response) => fetchProducts(req,res));

module.exports = router;