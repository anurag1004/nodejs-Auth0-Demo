const express = require('express'),
router = express.Router({mergeParams: true}),
passport = require('passport'),
dotenv = require('dotenv'),
util = require('util'),
url = require('url'),
querystring = require('querystring');

dotenv.config();

//perform the login, after login auth0 will redirect to callback

router.get('/login', passport.authenticate('auth0',{
    scope: 'openid email profile'
}), (req, res)=>{
        res.redirect('/');
});

//perform the final stage of authentication and redirect to previously url or '/user
router.get('/callback',(req, res, next)=>{
    passport.authenticate('auth0', (err, user, info)=>{
        if(err) return next(err);
        if(!user) return res.redirect('/login');

        req.logIn(user,err=>{
            if(err) return next(err);
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/user');
            //or just return to '/user'
        });
    })(req, res, next);
});

//perform session logout and redirect to homepage

router.get('/logout',(req, res)=>{
    req.logout();

    let returnTo = req.protocol + '://' + req.hostname;
    let port = req.connection.localPort;
    if(port !== undefined && port !== 80 && port !==443) {
        returnTo += ':' + port;
    }
    const logoutURL = new url.URL(
        util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
    );
    const searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
});
module.exports = router;