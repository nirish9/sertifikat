const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  req.logOut()
  req.flash('success' , "tizimdan chiqdingiz")
  res.redirect('/')
});

module.exports = router;
