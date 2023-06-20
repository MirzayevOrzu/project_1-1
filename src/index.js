const express=require('express')
const config=require('./shared/config')
const {stuffRouter,studentRouter,groupsRouter,directionRouter}=require('./routes')

const app=express()

app.use(express.json())
app.use(stuffRouter)
app.use(studentRouter)
app.use(groupsRouter)
app.use(directionRouter)

app.listen(config.port,()=>{
    console.log(`Server ${config.port}-portda ishlayapti`)
})