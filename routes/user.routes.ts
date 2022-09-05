import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    getUserByID, 
    getUsers, 
    updateUsers 
} from "../controllers/user.controllers";


const router = Router()

router.get( '/', getUsers )

router.get( '/:id', getUserByID )

router.post( '/', createUser )

router.patch( '/:id', updateUsers )

router.delete( '/:id', deleteUser )


export default router