import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import ejs from "ejs";

///////////////////////////////////////////////// app set-up //////////////////////////////////////////////////
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

////////////////////////////////////////////////// mongoDB ///////////////////////////////////////////////////
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const Article = mongoose.model('Article', new mongoose.Schema({
    title: String,
    content: String
}));

//////////////////////////////////////////////// route for /articles ///////////////////////////////////////////////////
app.route('/articles')
    .get(function(req, res) {
        Article.find()
            .then(found => {
                res.send(found);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    })
    .post(function(req, res) {
        console.log(req.body.title);
        console.log(req.body.content);
    
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save()
            .then(res => {
                res.send('Success: added article');
            })
            .catch(err => {
                res.send(err);
            });
    })
    .delete(function(req, res) {
        Article.deleteMany()
            .then(result => {
                res.send("Success: deleted articles");
            })
            .catch(err => {
                res.send(err);
            });
    });

////////////////////////////////////////////// route for /route/:articleName ////////////////////////////////////////////////
app.route('/articles/:articleTitle')
    .get(function(req, res) {

        Article.findOne({title: req.params.articleTitle})
            .then(found => {
                res.send(found);
            })
            .catch(err => {
                res.send("Article not found");
            });
    })
    .put(function(req, res) {

        Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content})
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .patch(function(req, res) {
        Article.updateOne(
            {title: req.params.articleTitle},
            { $set: 
                {
                    title: req.body.title, 
                    content: req.body.content
                }
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .delete(function(req, res) {
        Article.deleteOne({title: req.params.articleTitle})
            .then(found => {
                res.send('Success: deleted 1 article');
            })
            .catch(err => {
                res.send(err);
            });
    });

/////////////////////////////////////////////// port /////////////////////////////////////////////////////////
let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server is running on ${port}`);
});