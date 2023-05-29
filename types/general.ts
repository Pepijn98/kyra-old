export type ObjectValues<T> = T[keyof T]

export type RuntimeConfig = {
    auth: {
        secret: string;
    };
    database: {
        user: string;
        password: string;
        host: string;
        port: number;
        name: string;
    };
}
