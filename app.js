const session = require('express-session'),
express = require('express'),
app = express();
//load env variables
const dotenv = require('dotenv');
dotenv.config();

//load passport

const passport = require('passport'),
Auth0Strategy = require('passport-auth0');

//ROUTES//

const userViews = require('./lib/middleware/userViews.js'),
authRouter = require('./routes/auth.js'),
indexRouter = require('./routes/index.js'),
usersRouter = require('./routes/users.js');

// configuring express-session

const sess = {
    secret : "dhsdoiw",
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if(app.get('env') == 'production'){
    //use secure cookies in production(ssl/tls)
    sess.cookie.secure = true;
}

app.use(session(sess));
//after configuring app to use express-session, configure passport

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
                process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
    },
    //callback url is the url which is called when authentication is successed
    function(accessToken, refreshTOken, extraParams, profile, done){
          // accessToken is the token to call Auth0 API (not needed in the most cases)
          // extraParams.id_token has the JSON Web Token
          // profile has all the information from the user
            return done(null, profile);
        }
);
passport.use(strategy);

//for storing and retreiving user data from request
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  //telling express to use passport
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.use(userViews());

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
// routes //
/*
  -> routes/auth.js 
        for handling auth
  -> routes/index.js
        to server home page
  -> routes/users.js
        to serve the user profile
*/
app.listen(3000,(req, res)=>{
   console.log("Server started!!");
});