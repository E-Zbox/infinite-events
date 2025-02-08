import { config } from "dotenv";
// .env
config({ path: `.env.${process.env.NODE_ENV}` });
// app
import { app, server } from "./app";
// controllers
import { globalErrorController, invalidRoutesController } from "./controllers";
// routes
import { baseAPIURL, baseGraphURL, indexRoutes } from "./routes";
import { adminAuthRoutes } from "./routes/adminRoutes";
import eventRoutes from "./routes/eventRoutes";
import { adminGraphqlRoutes, userGraphqlRoutes } from "./routes/graphqlRoutes";
import { userAuthRoutes, userRoutes } from "./routes/userRoutes";

const { PORT } = process.env;

app.use("", indexRoutes);
// rest api
app.use(`${baseAPIURL}/auth/admin`, adminAuthRoutes);
app.use(`${baseAPIURL}/event`, eventRoutes);
app.use(`${baseAPIURL}/auth/user`, userAuthRoutes);
app.use(`${baseAPIURL}/user`, userRoutes);
// graph api
app.use(`${baseGraphURL}/admin`, adminGraphqlRoutes);
app.use(`${baseGraphURL}/user`, userGraphqlRoutes);

app.use("*", invalidRoutesController);

app.use(globalErrorController);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
