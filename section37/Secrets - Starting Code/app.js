import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption'; // Level 2
import md5 from 'md5'; // Level 3
import bcrypt from 'bcrypt'; // Level 4
import session from 'express-session'; // Level 5
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Level 6
import findOrCreate from 'mongoose-findorcreate';

//////////////////// APP SET-UP /////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const SECRETKEY = process.env.SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;

app.use(session({
    secret: SECRETKEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

///////////////////// DATABASE ///////////////////////
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

///////////////////// PASSPORT AUTH ////////////////////////
passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//////////////////// APP ROUTING /////////////////////

app.route('/')
    .get(function(req, res) {
        res.render('home');
    });

app.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile'] }));

app.route('/auth/google/secrets')
    .get(passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/secrets');
        });

app.route('/login')
    .get(function(req, res) {
        res.render('login');
    })
    .post(function(req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        req.login(user, function(err) {
            if(err) {
                console.log(err);
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/secrets');
                });
            }
        });

        // const username = req.body.username;
        // const password = req.body.password;

        // User.findOne({email: username})
        //     .then(found => {
        //         if(found) {
        //             bcrypt.compare(password, found.password)
        //                 .then(result => {
        //                     if(result) {
        //                         res.render('secrets');
        //                     } else {
        //                         res.send('<script>alert("Invalid login details."); window.location.href = "/login"; </script>');
        //                     }
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                 });
        //         } else {
        //             res.send('<script>alert("Invalid login details."); window.location.href = "/login"; </script>');
        //         };
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    });

app.route('/secrets')
    .get(function(req, res) {
        User.find({'secret': {$ne: null}})
            .then(found => {
                if(found) {
                    res.render('secrets', {usersWithSecrets: found});
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

app.route('/register')
    .get(function(req, res) {
        res.render('register');
    })
    .post(function(req, res) {

        User.register({username: req.body.username}, req.body.password, function(err, user) {
            if(err) {
                console.log(err);
                res.redirect('/register');
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/secrets');
                });
            }
        });

        // bcrypt.hash(req.body.password, SALT_ROUNDS)
        //     .then(hash => {

        //         // make new User doc
        //         const newUser = new User({
        //             email: req.body.username,
        //             password: hash
        //         });

        //         // check for email
        //         User.findOne({email: req.body.username})
        //             .then(found => {
        //                 if(found) {
        //                     res.send('<script>alert("Email already binded with existing account."); window.location.href = "/register"; </script>');
        //                     res.redirect('/register');
        //                 } else {
        //                     newUser.save()
        //                         .then(result => {
        //                             res.render("secrets");
        //                         })
        //                         .catch(err => {
        //                             console.log(err);
        //                         });
        //                 }
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });  

        

    });

app.route('/logout')
    .get(function(req, res) {
        req.logout(err => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    });

app.route('/submit')
    .get(function(req, res) {
        if(req.isAuthenticated()) {
            res.render('submit');
        } else {
            res.redirect('login');
        }
    })
    .post(function(req, res) {
        const newSecret = req.body.secret;

        User.findById(req.user.id)
            .then(found => {
                if(found) {
                    found.secret = newSecret;
                    found.save()
                        .then(result => {
                            res.redirect('/secrets');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    res.redirect('/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

//////////////////////////////// PORT //////////////////////////////
let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});