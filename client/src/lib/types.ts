
export interface APIError {
    message: string
    field: string
}

export interface AppError {
    response: {
        data: {
            errors: APIError[]
        }
    }
}