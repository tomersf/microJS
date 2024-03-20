import httpStatus from "http-status";

type HttpStatusCodes = keyof typeof httpStatus;
export interface SerializedError {
    message: any
    field?: string
}

export abstract class CustomError extends Error {
    abstract statusCode: HttpStatusCodes;
    abstract serializeErrors(): SerializedError[]

    constructor(message: string) {
        super(message)
    }
}