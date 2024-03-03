
export interface SerializedError {
    message: any
    field?: string
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): SerializedError[]

    constructor(message: string) {
        super(message)
    }
}