import path from "path";

export const GLABAL_ROOT: string = path.dirname(require.main.filename);
export const APP_NAME: string = process.env.APP_NAME || 'RedCore'
export const PORT = process.env.SERVER_PORT || 3000;
