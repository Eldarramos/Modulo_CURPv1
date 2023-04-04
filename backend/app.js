import express from 'express'
import cors from 'cors'
import db from './database/db.js'

import formRoutes from './routes/routes.js'

const app = express ()

app.use(cors())
app.use(express.json())
app.use('/forms', formRoutes)

try {
    await db.authenticate()
    console.log("Conexion exitosa a la DB")
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
    
}

app.get('/', (req,res) =>{
    res.send("Prueba")
})

app.listen(8000, () => {
    console.log('server UP running in http://localhost:8000/')
})