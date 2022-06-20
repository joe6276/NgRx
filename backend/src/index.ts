import cors from 'cors'
import express from 'express'
import routes from './Routes/todoRoutes'
import sql from 'mssql'
import configurations from './config/config'
 const app= express()
  app.use(express.json())
  app.use(cors())
  app.use('/products', routes)
  app.listen(8000, ()=>{
      console.log("Listening to This PORT :8000");   
  })

  sql.connect(configurations).then(pool =>{

    if(pool.connecting){
        console.log('connecting to the database')
    }

    if(pool.connected){
        console.log("connected")
    }
}).catch(e=>console.log(e))