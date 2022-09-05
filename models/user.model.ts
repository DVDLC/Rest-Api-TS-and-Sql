import { DataTypes } from "sequelize";
import db from "../db/connection";


// Si definimos el "id" en la base de datos manualmente, 
// no es necesario ponerlo

const User = db.define( 'User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
}) 

export default User