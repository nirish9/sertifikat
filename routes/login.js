const express = require('express');
const passport = require('passport')
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('login', {
    title: `Login Sahifasi`
  });
});

router.post('/' , async (req , res , next) => {
  passport.authenticate('local' , {
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash : "login yoki parol xato",
    successFlash : "xush kelibsiz"
  })(req , res , next)
})




module.exports = router;
