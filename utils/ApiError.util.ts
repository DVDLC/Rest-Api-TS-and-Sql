
export class ApiError extends Error{

    public readonly msg: string
    public readonly statusCode: number
    public readonly status: string

    constructor( httpsStatusCode: number, msg: string ){
       super( msg )

        this.msg = msg
        this.statusCode = httpsStatusCode
        this.status = `${ this.statusCode }`.startsWith('5') ? 'fail' : 'error'
        
        Error.captureStackTrace( this, this.constructor )

    }

}