import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path, { dirname } from "path";
import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";
import webhookRouter from "./controllers/hook.js";

async function startServer(typeDefs, resolvers) {
  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const PORT = process.env.PORT || 3001;
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      return authMiddleware({ req: req });
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await gqlServer.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/hook", webhookRouter);

  gqlServer.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `Debug GraphQL at http://localhost:${PORT}${gqlServer.graphqlPath}`
      );
    });
  });
}

startServer(typeDefs, resolvers).catch((err) => console.log(err));
