
const md = (req , res , next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        req.flash('danger' , "tizimga kiring")
        res.redirect('/login')
    }
}

module.exports = md


