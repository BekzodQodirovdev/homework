import express from "express";
import { config } from "dotenv";
import {
  SuperAdminRouter,
  AdminRouter,
  loginRouter,
  autherRouter,
  categoryRouter,
} from "./router/index.js";
config();

const app = express();
app.use(express.json());

app.use("/auther", autherRouter);
app.use("/category", categoryRouter);
app.use("/admin",AdminRouter)
app.use("/superAdmin", SuperAdminRouter)
app.use("/login", loginRouter);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server-port: ${[port]}`);
});
