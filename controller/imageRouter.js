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
        let result = await streamUpload(req)
        res.send(result.secure_url)
    }
    upload(req)
})
module.exports= imageRouter