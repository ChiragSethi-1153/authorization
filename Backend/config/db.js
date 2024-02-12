const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,  {
    dbName: process.env.DB_NAME, 
    useNewURLParser: true
 })
    .then(() => {
        console.log("Mongo Connected")
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB: ', err.message)
    })

const db = mongoose.connection

db.on("connected", () => {
    console.log("Mongoose connected to db")
})
db.on('error', (err) => console.log(err.message));
db.on("disconnected", (err) => {
    console.log("Mongoose connection is disconnected.");
});

process.on("SIGNIT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

module.exports = mongoose;