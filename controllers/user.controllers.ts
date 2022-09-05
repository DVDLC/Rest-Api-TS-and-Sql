import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.util";
import { catchAsync } from "../utils/catchAsync.util";

export const getUsers = async( req: Request, res: Response, next: NextFunction ) => {

    const query = { status: true }

    const [ total, users ] = await Promise.all([
        User.count({ where: query }),
        User.findAll({
            where: query,
            limit: 2,
            offset: 0
        })
    ])

    res.status( 200 ).json({
        total,
        users
    })
}

export const getUserByID = async( req: Request, res: Response ) => {

    const { id } = req.params

    const user = await User.findByPk( id )

    res.status( 200 ).json({
        user
    })
}

export const createUser = async( req: Request, res: Response ) => {

    const { name, email, status, ...props } = req.body

    const nwUser = await User.create({ 
        name,
        email,
        status
    })

    res.status( 200 ).json({
        nwUser
    })
}

export const updateUsers = async( req: Request, res: Response ) => {

    const { id } = req.params
    const { name, email, ...props } = req.body
    const user = await User.findByPk( id )

    if( name || name.length !== 0 ){
        user?.update({ name })
    }if( email || name.length !== 0 ){
        user?.update({ email })
    }

    res.status( 200 ).json({
        user
    })
}

export const deleteUser = async( req: Request, res: Response ) => {

    const { id } = req.params
    const user = await User.findByPk( id )

    const query = { status: false }

    user?.update( query )

    res.status( 200 ).json({
        user
    })
}