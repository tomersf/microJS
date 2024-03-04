import { CustomError } from "./custom-error";

import httpStatus from "http-status";

export class BadRequestError extends CustomError {
    statusCode = httpStatus.BAD_REQUEST;

    constructor(public message: string) {
        super(message);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}