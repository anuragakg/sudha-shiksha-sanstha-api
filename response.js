const success=(message,res)=>{
    json= {
        status_code:200,
        status:true,
        message:message
    }
    res.send(json)
}
const error=(message,res)=>{
    json= {
        status_code:400,
        status:false,
        message:message!=''?message:'Error ! Please try again'
    }
    res.send(json)
}
module.exports={
    success,error
}