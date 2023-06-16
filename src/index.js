const express=require('express')
const config=require('./shared/config')
const stuffRouter=require('./routes/stuff')

const app=express()

app.use(express.json())
app.use(stuffRouter)

app.listen(config.port,()=>{
    console.log(`Server ${config.port}-portda ishlayapti`)
})