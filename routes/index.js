const express = require('express');
const dbProduct = require('../models/Product')
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  dbProduct.find({}, (err, data) => {
    try {
      res.render('index', {
        title: 'Bosh Sahifa',
        db: data
      });
    } catch (err) {
      // console.log(err);
      res.render('error')
    }
  })
});

module.exports = router;

