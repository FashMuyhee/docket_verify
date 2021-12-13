import app from "./server.js"
import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config()

const port = process.env.PORT
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000000
  }
)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .then(async client => {
    app.listen(port, () => {
      console.log(`serving localhost:${port}`)
    })
  })

