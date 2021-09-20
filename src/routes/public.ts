import express from 'express'
import { Request, Response } from 'express';
import { register } from '../controllers/register';

const router = express.Router();

router.post('/register', async(req: Request, res: Response) => register(req, res));

module.exports = router;