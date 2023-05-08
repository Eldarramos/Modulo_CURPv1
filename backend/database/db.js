import {Sequelize} from 'sequelize'


const db = new Sequelize(
        "bd",
        "usuario",
        "contraseña",
        {host: 'URL',
         dialect: 'servicio'
        
        })

    export default db