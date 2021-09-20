import { Request, Response } from "express"
import express from 'express'
const app = express()
const port = process.env.port || 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/public',require('./routes/public'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})