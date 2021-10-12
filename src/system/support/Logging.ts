import pino from "pino";

import pinoms, {Streams} from 'pino-multi-stream'
import {APP_NAME} from "../../config/constans/application";

const multistream = pinoms.multistream

const destError = pino.destination('./logs/error.log')
const destFatal = pino.destination('./logs/fatal.log')

const streams: Streams = [
    {stream: process.stdout},
    {level: 'error', stream: destError},
    {level: 'fatal', stream: destFatal}
]

const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

const logger: pino.Logger = pino({
    name: APP_NAME,
    customLevels: levels,
    useOnlyCustomLevels: true,
    level: 'http'
}, multistream(streams))

export default logger;
