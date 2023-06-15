const dotenv=require('dotenv')
dotenv.config()

const config={
    port:process.env.PORT,
    db:{
        name:process.env.DB_NAME,
        port:process.env.DB_PORT,
        password:process.env.DB_PASSWORD,
        user:process.env.DB_USER
    },
    jwt:{
        secret:process.env.JWT_SECRET
    }
}

module.exports=config