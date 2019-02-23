var models = require('../models')
const multer = require('multer');
const storage = multer.memoryStorage();
const path = require('path');
// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb){
//         cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: 'ap-southeast-2'
}); // Set region
const s3 = new aws.S3();

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000 * 1000 * 5},
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png/;  //max size of image is 5mb
        var filestypesFriendly = 'jpeg, jpg, png.';
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        const error = new multer.MulterError('EXTENSION_INVALID_FILE', file.fieldname);
        error.message = ["File upload only supports the following filetypes - " + filestypesFriendly];
        return cb(error);
    },
    //     multerS3({
    //     s3: s3,
    //     bucket: 'michael-ecommerce',
    //     key: function (req, file, cb) {
    //         let path = 'ecommerce/public/images/products/'
    //         cb(null, path + req.params.fileName + file.originalname); //use Date.now() for unique file keys
    //     }
    // })
}).single("file");

module.exports={
    AddProduct(req, res) {
        // models.product.create({
        //     productName:req.body
        // })
        let {userId} = req.cookies
        upload(req, res, function (error) {
            console.log(req.body.productName)
            console.log(req.body.productPrice)
            console.log(req.body.productCategory)
            console.log(req.file)
            let fileName = Date.now() + req.file.originalname
            let path = 'ecommerce/public/images/products/' + fileName
            console.log(fileName)
            models.product.create({
                productName:req.body.productName,
                imagePath:fileName,
                productPrice:parseInt(req.body.productPrice),
                category:req.body.productCategory,
                productOwner:userId
            }).then(value => {
                const params = {
                    Bucket: 'michael-ecommerce',
                    Key: path,
                    Body: Buffer.from(req.file.buffer,'base64'),
                    ContentEncoding: 'base64',
                    ACL: 'public-read'
                };
                s3.putObject(params).promise()
                if(value) {
                    res.json({'state':'success'})
                }
            }).catch(error => {
                console.log(error)
                res.json({error})
            })
        })
    }
}