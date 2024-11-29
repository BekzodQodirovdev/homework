
import { Hono } from "hono"
import morgan from "morgan"
import { indexRouter } from "./router/index.routes.js"

const app = new Hono()

app.use(morgan("dev"))

app.use("/api/v1", indexRouter)

app.use((err, req, res) => {
    if (err) {
        return res.send(err.message)
    }
    return res.send("not found")
})
