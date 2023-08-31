const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphiqlExplorer = require("express-graphiql-explorer");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: { headerEditorEnabled: true },
  })
);

mongoose
  // .connect(
  //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.${process.env.CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
  //   { useNewUrlParser: true }
  // )
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ac-rrqbqby-shard-00-00.${process.env.CLUSTER}.mongodb.net:27017,ac-rrqbqby-shard-00-01.${process.env.CLUSTER}.mongodb.net:27017,ac-rrqbqby-shard-00-02.${process.env.CLUSTER}.mongodb.net:27017/?replicaSet=atlas-xetkx1-shard-0&authSource=admin&tls=true&appName=mongosh+1.10.6`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected")
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
