const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/auth-route')
const adminRoute = require('./routes/admin-route')
const { connectToDB } = require('./db/db'); 
dotenv.config(); 
const path = require('path')

app.get('/', (req, res)=>{
    return res.send("basic setup")
})

const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}  


app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/admin', adminRoute)  

app.listen(process.env.PORT, (req, res)=>{
    console.log('Listening on PORT ', process.env.PORT)
})

connectToDB();