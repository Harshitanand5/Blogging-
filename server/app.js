const express= require('express');
const app=express()
const mongoose=require('mongoose');
const PORT=5000;
//const {MONGOURI}=require("./Keys");




//mongoose.connect(MONGOURI,{
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//})
//mongoose.connection.on('connected',()=>{
 //   console.log("connect to mongo");
//})

mongoose.connect('mongodb://localhost/newAPI',{ useUnifiedTopology: true , useNewUrlParser: true} );
mongoose.connection.once('open',()=>{
    console.log('Connection made to the Mongodb');
});
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))





app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})