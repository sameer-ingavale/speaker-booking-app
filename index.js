const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
// const path = require("path");
const connectDB = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();
/* 
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
}); */

// app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

connectDB(() => console.log("wow"));

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/graphql" });

app.use(authMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
