const express=require('express');
const app=express();
var cors = require('cors')
app.use(cors());
const bodyParser = require('body-parser');

const mongoose=require('./db/mongoose');
const commonRouter=require('./routers/common');
const usersRouter=require('./routers/users');
const pagesRouter=require('./routers/pages');
app.use(express.json());
app.use('/userimage',express.static('public/uploads/users'));

app.get('/',(req,res)=>{
    const port=process.env.PORT;
    const MAIL_HOST=process.env.MAIL_HOST;
    const MONGODB_URL=process.env.MONGODB_URL;
    res.send('port : '+port + ' MAIL_HOST : '+MAIL_HOST )
});

app.use('/common',commonRouter);
app.use('/users',usersRouter);
app.use('/page',pagesRouter);
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT;

app.listen(port,()=>{
    console.log('server running on port: '+port)
});