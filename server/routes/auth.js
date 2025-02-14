const express = require('express')
const passport = require('passport')

const router = express.Router()


router.get('/', passport.authenticate('discord'))
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',

}), (req, res) => {
    console.log(req.user)
    res.send(200);
   
})

router.get('/status', (req,res)=>{
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false });
    }
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.json({ message: 'Logged out' });
        });
    });
});




module.exports = router