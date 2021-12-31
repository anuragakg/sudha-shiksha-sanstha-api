const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    const port=process.env.PORT;
    const MAIL_HOST=process.env.MAIL_HOST;
    //const MONGODB_URL=process.env.MONGODB_URL;
    res.send('port : '+port + 'MAIL_HOST : '+MAIL_HOST )
});
const port=process.env.PORT;
app.listen(port,()=>{
    console.log('server running on port: '+port)
});