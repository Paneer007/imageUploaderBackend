/* eslint-disable no-unused-vars */
require('dotenv').config()

const imageRouter = require('express').Router()
const multer = require('multer')
const fileUpload = multer()
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const { response } = require('../app')
imageRouter.post('/upload',fileUpload.single('file'),(req,res,next)=>{
    let streamUpload = (req)=>{
        console.log('something is happening')
        return new Promise((resolve,reject)=>{
            let stream = cloudinary.uploader.upload_stream(
                (error,result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject(error)
                    }
                }
            )
            streamifier.createReadStream(req.file.buffer).pipe(stream)
        })
    }
    async function upload(req){
        console.log('started')
        console.log(req.file)
        let result = await streamUpload(req)
        console.log(result)
        res.send(result.secure_url)
    }
    upload(req)
})
imageRouter.get('/',(req,res)=>{
    console.log(cloudinary.config().cloud_name)
    console.log('habibi habiboooooo')
})
module.exports= imageRouter