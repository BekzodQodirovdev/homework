import { app } from "./src/app.js";
import { config } from "dotenv"
import { logger } from "./src/utils/logger.js";
config()
const port = process.env.PORT || 4000

const startApp = () => {
    try {
        app.listen(port, () => {
            logger.info(`Server running in port: ${port}`)
        })
    } catch (err) {
        logger.info(err)
    }
}

startApp()