const express = require('express');
const dbProduct = require('../models/Product')
const md = require('../middleware/verifed')
const upload = require('../middleware/fileupload')
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('add', {
    title: `Mahsulot qo'shish`
  });
});

router.post('/', upload.single('img'), md, (req, res) => {
  // const db = new dbProduct(req.body)
  const db = new dbProduct({
    title: req.body.title,
    price: req.body.price,
    img: req.file.filename,
    sale: req.body.sale,
    lifetime: req.body.lifetime,
    category: req.body.category,
    aboutPro: req.body.aboutPro,
    phone: req.body.phone,
  })
  db.save((err) => {
    if (err) {
      // console.log(err)
      res.render('error')
    } else {
      res.redirect('/')
    }
  })

  // try {
  //   db.save()
  //   res.redirect('/')
  // } catch (err) {
  //   console.log(err);
  // }
})

module.exports = router;
