export interface CustomError {
    response: {
        status: number;
        data: {
            error: string;
        };
    };
}