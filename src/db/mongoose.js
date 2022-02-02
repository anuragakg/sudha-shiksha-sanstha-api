const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
   // useCreateIndex:true,
}).then(()=>console.log('connected to mongodb '))
.catch(err=>console.log(err));