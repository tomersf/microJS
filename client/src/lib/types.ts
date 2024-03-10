
export interface APIError {
    message: string
    field: string
}

export interface ApiError {
    response: {
        data: {
            errors: APIError[]
        }
    }
}