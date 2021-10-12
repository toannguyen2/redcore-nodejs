import WebSocket from "ws";
import logger from "../../system/support/Logging";

class ClientRegistry {
    onMessage(data: WebSocket.RawData, isBinary: boolean) {
        try {
            const raw = data.toString('utf8')
            const json = JSON.parse(raw)
        } catch (err) {
            logger.error(err)
        }
    }

    onClose() {
        // console.log('onClose.')
    }
}

const clientRegistry = new ClientRegistry();
export default clientRegistry;
