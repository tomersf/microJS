
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

export interface User {
    currentUser: {
        id: number
        name: string
        email: string
    }
}