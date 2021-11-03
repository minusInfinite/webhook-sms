import dotenv from "dotenv"
dotenv.config()

import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import {ApolloServer} from "apollo-server-express"
import express from "express"
import path from "path"
import db from "./config/connection.js"
import {typeDefs,resolvers} from "./schemas/index.js"

async function startServer(typeDefs,resolvers) {
    const app = express()
    const PORT = process.env.PORT || 3001
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    })

    await gqlServer.start()

    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    gqlServer.applyMiddleware({app})

    if(process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")))
    }

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
            console.log(`Debug GraphQL at http://localhost:${PORT}${gqlServer.graphqlPath}`)
        })
    })
}

startServer(typeDefs,resolvers).catch(err => console.log(err))