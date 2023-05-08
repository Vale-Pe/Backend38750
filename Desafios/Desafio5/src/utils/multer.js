import multer from 'multer'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'/public/uploads')
    },
    filename: function(req, file, cb){
        console.log('file: ', file)
        cb(null, `${Date.now()}-${file.originalname}`)
    } 
})

const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err)
        next()
    }
})


export default uploader