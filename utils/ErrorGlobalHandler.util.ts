import { ErrorRequestHandler, Request, NextFunction } from "express";
import { ApiError } from "./ApiError.util";

import dotenv from 'dotenv'
dotenv.config()

export const globalErrorHandler: ErrorRequestHandler = ( err, req, res, next ) => {

    
    err.statusCode = err.statusCode || 500
    err.status     = err.status || 'fail'

    
    const sendErrorDev = ( err: ApiError, req: Request, next: NextFunction ) => {

        res.status( err.statusCode ).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    const sendErrorProd = ( err: ApiError, req: Request, next: NextFunction ) => {

        res.status( err.statusCode ).json({
            ok: false,
            status: err.status,
            message: err.message,
        })
    }
    

    if( process.env.NODE_ENV === 'development' ){
        sendErrorDev( err, req, next )
    }else if( process.env.NODE_ENV === 'production' ) {
        sendErrorProd( err, req, next )
    }

}