import {IncomingMessage} from "http";

const cookie = require('cookie')

export function getCookieValue(req: IncomingMessage, key: string): string | undefined {
    if ((req as any).cookies) {
        return (req as any).cookies[key];
    }

    let cookies: any = req.headers.cookie;

    if (cookies === undefined) {
        return undefined;
    }

    cookies = cookie.parse(req.headers.cookie || '');
    return (cookies as any)[key];
}
