// Libraries
import express, { Application }  from 'express'
import cors from 'cors'
// Routes
import userRoutes from './routes/user.routes'
// utils
import { ApiError } from './utils/ApiError.util';
import { globalErrorHandler } from './utils/ErrorGlobalHandler.util';
import { HttpStatusCode } from './utils/httpStatusCode.utils';
// database
import db from './db/connection';

class Server{
    
    private app   : Application;
    private PORT  : string
    private paths = {
        users: '/api/v1/users',
        error: '*'
    }
    
    constructor(){
        this.app    = express()
        this.PORT   = process.env.PORT || "4000"

        this.middlewares()

        this.DBconnection()

        this.routes()

        this.notFound()

        this.errorHandler()
    }
    
    middlewares(){
        // Cors
        this.app.use( cors() )

        // Lectura del body
        this.app.use( express.json() )

        //Carpeta publica
        this.app.use( express.static('public' ) )
    }

    routes(){
        this.app.use( this.paths.users, userRoutes )
    }

    notFound(){

        this.app.all( this.paths.error, ( req, res, next ) => {
            next(  
                new ApiError(
                    HttpStatusCode.BAD_REQUEST, 
                    `${ req.method } ${ req.originalUrl } is not found`
                )
            )
        })
    }

    errorHandler(){
        this.app.use( globalErrorHandler )
    }

    async DBconnection(){
        try{
            await Promise.all([
                db.authenticate(),
                db.sync(/* force: true */)
            ])

            console.log( 'DB authenticated and sync' )
        
        }catch(err){
            console.log( 'Something went wrong', err )
        }
    }

    listen(){
        this.app.listen( this.PORT, () => {
            console.log( `Server running at port ${ this.PORT }` )
        })
    }
}

export default Server