const multer=require('multer');
var fs = require('fs');
var path = require('path');

const makeFolder=(dir)=>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

const storage=(dir)=>{
    const store= multer.diskStorage({
        destination: function(req, file, cb) {
            makeFolder(dir)
            cb(null, dir);
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            //console.log(file.originalname)
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    return store;
}


const uploadFunc=(filename,dir='')=>{
    if(dir==''){
        var dirPath = 'public/uploads/users';
    }else{
        var dirPath = 'public/uploads/'+dir;
    }
    const upload=multer({
        //dest:'public/uploads',
       // filename: function (req, file, cb) {
       //     cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
       //   },
       limits:{
           fileSize:1000000 //==1000000= 1 MB
       },
       fileFilter(req,file,cb){
           if(!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
               req.fileValidationError = 'Only image files are allowed!'+file.originalname;
               return cb(new Error('Only image files are allowed!'), false);
           }
           cb(null,true)
       },
       storage: storage(dirPath)
   }).single(filename);
   return upload;
}
module.exports={
    storage:storage,
    uploadFunc:uploadFunc,
    makeFolder:makeFolder
}
