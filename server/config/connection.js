import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const { connect, connection } = mongoose

connect(process.env.MONGODB_URI || "mongodb://localhost/webhooksms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default connection
