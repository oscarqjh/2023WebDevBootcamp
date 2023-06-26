import bodyParser from 'body-parser';
import express from 'express';
import ejs from 'ejs';

//////////////////// app set-up /////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.route('/')
    .get(function(req, res) {
        res.render('home');
    });

app.route('/login')
    .get(function(req, res) {
        res.render('login');
    });

app.route('/register')
    .get(function(req, res) {
        res.render('register');
    });




//////////////////////////////// PORT ////////////////////////
let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});