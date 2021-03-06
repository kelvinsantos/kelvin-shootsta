import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import log4js from "log4js";
import config from "config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json';

import videoRoutes from "./routes/video-routes"

// configure logger
log4js.configure(config.get("log4js"));

// configure database
const databaseUrl = "mongodb://" + config.get("mongo.host") + ":27017/" + config.get("mongo.databaseName");
// tslint:disable-next-line:no-console
console.log("Try to connect to database: " + databaseUrl);
mongoose.Promise = global.Promise;
mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err: Error) => {
    // tslint:disable-next-line:no-console
    console.log("Could not connect to database:", err);
  });
mongoose.set('useCreateIndex', true);

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = config.get("server.port");

const app = express();

// JSON Setup
app.use(
  bodyParser.json({
    limit: "5mb"
  })
); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true })); // support encoded bodies
app.use(
  cors({
    origin: [
      /localhost/
    ],
    credentials: true,
    exposedHeaders: ["Content-Disposition"]
  })
);

// server static files
app.use(express.static('public'))

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
} );

app.use("/api/videos", videoRoutes);

// swaggerUI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
});