const express = require('express');
const dbProduct = require('../models/Product')
const upload = require('../middleware/fileupload')
const router = express.Router();


router.get('/:id', (req, res) => {
    dbProduct.findById(req.params.id, (err, data) => {
        try {
            res.render("product", {
                title: "Mahsulot haqida",
                data
            })
        } catch (error) {
            // console.log(error);
            res.render('error')
        }
    })
})

/* EDIT =============================== */

router.get('/edit/:id', (req, res) => {
    dbProduct.findById(req.params.id, (err, data) => {
        try {
            res.render("update", {
                title: "Mahsulotni o'zgartirish",
                data
            })
        } catch (error) {
            // console.log(error);
            res.render('error')
        }
    })
})

router.post('/edit/:id', upload.single('img'), async (req, res) => {
    const db = {
        title: req.body.title,
        price: req.body.price,
        img: req.file.filename,
        sale: req.body.sale,
        lifetime: req.body.lifetime,
        category: req.body.category,
        aboutPro: req.body.aboutPro,
        phone: req.body.phone,
    }

    try {
        const idm = { _id: req.params.id }
        await dbProduct.findByIdAndUpdate(idm, db)
        res.redirect('/')
    } catch (error) {
        // console.log(error);
        res.render('error')
    }
})

/* DELETE =============================== */

router.get('/delete/:id', async (req, res) => {
    try {
        const id = {_id : req.params.id}
        await dbProduct.findByIdAndDelete(id)
        res.redirect('/')
    } catch (error) {
        // console.log(error)
        res.render('error')
    }
})



module.exports = router;