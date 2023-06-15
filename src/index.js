const express=require('express')
const config=require('./shared/config')

const app=express()


app.listen(config.port,()=>{
    console.log(`Server ${config.db.port}-portda ishlayapti`)
})