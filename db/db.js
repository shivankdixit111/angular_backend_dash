const mongoose = require('mongoose')

async function connectToDB() {
    await mongoose.connect(process.env.DB_URL)
    .then(()=> console.log('Connected to DB'))
    .catch((err)=> console.log('Failed to connect to DB'))
}

module.exports = { connectToDB };
