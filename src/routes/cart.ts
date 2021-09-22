import express from 'express'
import { Request, Response } from 'express';
import { addToCart } from '../controllers/cart';

const router = express.Router();

router.post('/add_item', async(req: Request, res: Response) => addToCart(req, res));

module.exports = router;