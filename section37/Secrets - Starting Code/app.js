import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';

//////////////////// app set-up /////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

///////////////////// DATABASE ///////////////////////
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = process.env.SECRET_ENCRYPTION;
userSchema.plugin(encrypt, {
    secret: secret,
    encryptedFields: ['password']
});

const User = new mongoose.model("User", userSchema);

//////////////////// APP ROUTING /////////////////////

app.route('/')
    .get(function(req, res) {
        res.render('home');
    });

app.route('/login')
    .get(function(req, res) {
        res.render('login');
    })
    .post(function(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({email: username})
        .then(found => {
            if(found) {
                if(found.password === password) {
                    res.render('secrets');
                } else {
                    res.send('<script>alert("Invalid login details."); window.location.href = "/login"; </script>');
                }
            } else {
                res.send('<script>alert("Invalid login details."); window.location.href = "/login"; </script>');
            };
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

        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });

        User.findOne({email: req.body.username})
            .then(found => {
                if(found) {
                    res.send('<script>alert("Email already binded with existing account."); window.location.href = "/register"; </script>');
                    res.redirect('/register');
                } else {
                    newUser.save()
                        .then(result => {
                            res.render("secrets");
                        })
                        .catch(err => {
                            res.send(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });

    });

app.route('/logout')
    .get(function(req, res) {
        res.redirect('/');
    });

//////////////////////////////// PORT ////////////////////////
let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});