import bodyParser from "body-parser";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import date from './date.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let next = ["Buy Food", "Study Programming", "Exercise"];
let workItems = [];

app.get("/", function(req, res) {
    
    let day = date.getDate();

    res.render('list', {
        listTitle: day,
        nextItem: next
    })
});

app.post("/", function(req, res) {
    let newItem = req.body.nextItem;
    if(req.body.button === 'Work') {
        
        workItems.push(newItem);
        res.redirect('/work');
    } else {
        next.push(newItem);
        res.redirect('/');
    }
})

app.get("/work", function(req, res) {
    res.render('list', {
        listTitle: "Work List",
        nextItem: workItems
    })
})

app.get('/about', function(req, res) {
    res.render('about');
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});