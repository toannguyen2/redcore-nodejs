import kernel from "../system/Kernel";
import http, {IncomingMessage} from "http";
import ws, {WebSocket} from "ws";
import serverRegistry from "../app/websocket/ServerRegistry";
import stream from "node:stream";
import logger from "../system/support/Logging";
import {PORT} from "./constans/application";
import boot from "../system/Boot";
import Config from "../system/core/config/Config";

class ApplicationConfig extends Config {
    server: http.Server
    wsServer: ws.Server

    private readonly authenticatedBind: any;

    constructor() {
        super()

        this.authenticatedBind = this.authenticated.bind(this)
    }

    config() {
        this.publicHttpServer()
        this.publicWebSocketServer()
    }

    publicHttpServer() {
        try {
            this.server = kernel.expressApp.listen(PORT, () => {
                logger.info(`HTTP started at port: ${PORT}`)
                this.next()
            });
        } catch (err) {
            logger.error(err)
            boot.stop()
        }
    }

    publicWebSocketServer() {
        this.wsServer = new ws.Server({noServer: true});
        this.wsServer.on('connection', serverRegistry.onConnection);
        this.wsServer.on('close', serverRegistry.onClose);

        this.server.on('upgrade', this.onUpgrade.bind(this));
    }

    onUpgrade(req: IncomingMessage, socket: stream.Duplex, head: Buffer) {
        // @ts-ignore
        this.wsServer.handleUpgrade(req, socket, head, this.authenticatedBind);
    }

    authenticated(client: WebSocket, request: IncomingMessage) {
        serverRegistry.authenticated(client, request)
    }
}

const applicationConfig = new ApplicationConfig();
export default applicationConfig;
