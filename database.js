const mongoose = require('mongoose');

let myConnection = null

const connect = ()=>{

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => {
        myConnection = conn   
        console.log('Connected to MongoDB Atlas')}
      )
      .catch(err => console.error('Error connecting', err));
}

const database = {
    myConnection,
    connect
}

module.exports =  database