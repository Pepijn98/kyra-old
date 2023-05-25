export type ObjectValues<T> = T[keyof T]

export type RuntimeConfig = {
    database: {
        user: string
        password: string
        host: string
        port: number
        name: string
    }
}
