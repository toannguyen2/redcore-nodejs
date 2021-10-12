const timeStart = Date.now();
import dotenv from "dotenv";

dotenv.config();
import logger from "./system/support/Logging";

logger.info('Booting...')
import boot, {Boot} from "./system/Boot";

class Application {
    boot: Boot = boot

    start() {
        this.boot.start()
    }

    onReady() {
        const timeCompleted = Date.now();
        logger.info('Boot completed in ' + (timeCompleted - timeStart) + 'ms.')
        logger.info('Application is ready.')
    }
}

const application = new Application();
application.start()
export default application;
