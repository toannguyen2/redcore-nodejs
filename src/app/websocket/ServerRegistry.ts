import {IncomingMessage} from "http";
import {WebSocket} from "ws";
import {UNAUTHENTICATED_STATUS} from "../../config/constans/status";
import applicationConfig from "../../config/ApplicationConfig";
import {getCookieValue} from "../../system/support/CookieSupport";
import clientRegistry from "./ClientRegistry";

class ServerRegistry {
    authenticated(client: WebSocket, request: IncomingMessage) {
        const isVerify = this.verify(request)
        if (isVerify)
            applicationConfig.wsServer.emit('connection', client, request);
        else
            applicationConfig.wsServer.emit('close', client, UNAUTHENTICATED_STATUS);
    }

    verify(req: IncomingMessage): boolean {
        // Authentication
        const authJwt = getCookieValue(req, 'auth')
        if (authJwt === void 0) {
            return false;
        }

        if (authJwt === 't')
            return true;

        return false;
    }

    onConnection(client: WebSocket, request: IncomingMessage) {
        client.on('message', clientRegistry.onMessage)
        client.on('close', clientRegistry.onClose)
    }

    onClose(client: WebSocket, status: number) {
        if (status === UNAUTHENTICATED_STATUS) {
            // TODO: Gửi event auth fail trước khi đóng kết nối.
        }
        client.close();
        setTimeout(() => {
            // @ts-ignore
            if ([client.OPEN, client.CLOSING].includes(client.readyState)) {
                client.terminate();
            }
            client = void 0;
        }, 10000);
    }
}

const serverRegistry = new ServerRegistry();
export default serverRegistry;
