import { app } from "./src/app.js"
import { serve } from "@hono/node-server"
import { config } from "dotenv"
import { logger } from "./src/utils/logger.js"
config()
const port = process.env.PORT || 4000

const startApp = () => {
    try {
        logger.info(`Server is running on http://localhost:${port}`)
        serve({
            fetch: app.fetch,
            port,
        })
    } catch (err) {
        logger.info(err)
    }
}

startApp()
