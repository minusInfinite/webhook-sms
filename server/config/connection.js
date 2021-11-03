import { connect, connection } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default connection
