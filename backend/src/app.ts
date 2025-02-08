import cors from "cors";
import express from "express";
import { createServer, Server as HTTPServer } from "http";
import mongoose from "mongoose";
import { DefaultEventsMap, Namespace, Server } from "socket.io";
// middleware
import { verifyUserSocketToken } from "./middlewares/verifyToken";
// listeners
import userListener from "./listeners/userListener";

const { MONGODB_URI } = process.env;

class Service {
  public app: express.Application;
  public httpServer: HTTPServer;
  public ioServer: Server;
  public userNamespace: Namespace<DefaultEventsMap>;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.ioServer = new Server(this.httpServer, {
      cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
      },
    });
    this.userNamespace = this.ioServer.of("/socket/user");

    this.initializeApp();
    this.connectDb();
    this.initializeIO();
  }

  initializeApp() {
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  connectDb() {
    mongoose
      .connect(MONGODB_URI!)
      .then(async () => {
        console.log("Database connected successfully!");
      })
      .catch((err) => console.log(err));
  }

  initializeIO() {
    this.ioServer.on("connection", () => {
      console.log("Socket connected successfully!");
    });
    this.userNamespace.use(verifyUserSocketToken);

    userListener(this.userNamespace);
  }
}

const service = new Service();

export const app = service.app;

export const server = service.httpServer;

export const userNamespace = service.userNamespace;
