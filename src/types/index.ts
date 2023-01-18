declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User {
            username: string;
        }
    }
}

declare module "express-session" {
    interface SessionData {
        redirectTo: string;
    }
}

export { };
