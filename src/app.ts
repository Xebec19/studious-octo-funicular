import express from 'express'
import { updateLastAccess } from "./utils/updateLastAccess"
const app = express()
const port = process.env.port || 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/public',updateLastAccess,require('./routes/public'));
app.use('/cart',updateLastAccess,require('./routes/cart'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})