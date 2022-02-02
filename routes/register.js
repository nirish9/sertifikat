const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const userDb = require('../models/Users')
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('registratsiya', {
    title: `Registratsiya`
  });
});

router.post('/',
  [
    check("name", "ism kiriting").notEmpty(),
    check("surname", "familya kiriting").notEmpty(),
    check("login", "login kiriting").notEmpty(),
    check("phone_number", "telefon raqam kiriting").notEmpty(),
    check("email", "Email kiriting").notEmpty(),
    check("password", "Password kiriting").notEmpty(),
  ],
  async (req, res) => {
    // if(req.body.password){
    //   check("password" , "Password kiriting")
    //   .equals(req.body.password)
    //   .notEmpty()
    //   .run(req)
    // }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('registratsiya', {
        title: "Ro'yxatdan o'tishda xatolik bor",
        errors: errors.array()
      })
    } else {
      try {
        const db = await new userDb({
          name: req.body.name,
          surname: req.body.surname,
          login: req.body.login,
          phone_number: req.body.phone_number,
          email: req.body.email,
          password: req.body.password,
        })

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(db.password, salt, function (err, hash) {
            if (err) {
              // console.log(err)
              res.render('error')
            } else {
              db.password = hash
              db.save((err) => {
                if (err) {
                  // console.log(err)
                  res.render('error')
                }
                else {
                  req.flash('success', "registratsiyadan muvaffaqiyatli o'tdingiz")
                  res.redirect('/')
                }
              })
            }
          });
        });
      } catch (error) {
        // console.log(error)
        res.render('error')
      }
    }
  })




module.exports = router;
