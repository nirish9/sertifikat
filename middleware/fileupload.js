const multer = require('multer');
const moment = require('moment');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/dataImg/')
    },
    filename: function (req, file, cb) {
        const date = moment().format("MMM-Do-YY")
        cb(null, `${date}-${file.originalname}`)
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const checkExtname = ['image/jpeg', 'image/png', 'image/jpg']
const fileFilter = (req, file, cb) => {
    if (checkExtname.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})


