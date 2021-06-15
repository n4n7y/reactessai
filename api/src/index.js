import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { connectToDB } from './database/index.js'
import { router } from './routes/index.js'

const app = express()
config()
const port = process.env.PORT || 3000

connectToDB()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())


app.use('/api', router)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})