const express = require("express");
const connectDB = require("./config/db");
const graphqlHttp = require("express-graphql");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middlewares/authMiddleware");

const rootSchema = require("./graphql/schema/rootSchema");
const rootResolver = require("./graphql/resolvers/rootResolver");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.use(express.json());
app.use(cors());

app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHttp({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: true
  })
);

connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
