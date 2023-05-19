//Import to manage servers and routes
const express = require('express')
//Object Data Modeling (ODM) library to enforce a specific schema at the application layer
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/inotebook',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})

const app = express() //creates a new instance of the Express application  to configure routes, middleware, and other functionalities 
const port = 5000

app.use(express.json()) //parses the JSON data in the request body and makes it available in req.body 

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNote's backend listening on port ${port}`)
})
