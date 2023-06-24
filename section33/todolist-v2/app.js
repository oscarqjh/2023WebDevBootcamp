import bodyParser from "body-parser";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// database
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

// items model
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: 'Welcome to your todolist!'
});

const item2 = new Item({
    name: 'Hit the + button to add a new item.'
});

const item3 = new Item({
    name: '<-- Hit this to delete an item.'
});

const defaultItems = [item1, item2, item3];

// Item.updateOne({_id: '64967414e694bc2d80313ddc'}, {name: '<-- Hit this to delete an item.'}).then(res => {
//     console.log('success');
// });

// list model
const List = mongoose.model('List', new mongoose.Schema({
    name: String,
    items: [itemSchema]
}))

// get for home
app.get("/", function(req, res) {

    const query = Item.find().then(items => {
        if(items.length === 0) {
            Item.insertMany(defaultItems).then(res => {
                console.log('success');
            });
            res.redirect('/');
        } else {
            res.render('list', {
                listTitle: "Home",
                nextItem: items
            })
        }

    })
    
});

app.post("/", function(req, res) {
    let itemName = req.body.nextItem;
    const newItem = new Item({
        name: itemName
    });

    if(req.body.button === "Home") {
        newItem.save();

        res.redirect('/');
    } else {
        List.findOne({name: req.body.button}).then(found => {
            found.items.push(newItem);
            found.save();
        })
        res.redirect('/' + req.body.button);
    }
})

app.post("/delete", function(req, res) {
    const deleteItemID = req.body.delete;

    if(req.body.title === "Home") {
        Item.findByIdAndRemove(deleteItemID).then(res => {
            console.log(`Succesfully deleted item ${deleteItemID}`);
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: req.body.title}, {
            $pull: {
                items: {
                    _id: deleteItemID
                }
            }
        }).then(found => {
            console.log(`Succesfully deleted item ${deleteItemID}`)
        })
        res.redirect("/" + req.body.title);
    }
})

app.get("/:listName", function(req, res) {
    const newListName = _.capitalize(req.params.listName);

    List.findOne({name: newListName}).then(found => {
        if(found) {
            // show existing list
            res.render('list', {
                listTitle: newListName,
                nextItem: found.items
            })
        } else {
            // create new list
            console.log(newListName + " added");
            const list = new List({
                name: newListName,
                items: defaultItems
            })
            list.save();
            res.redirect("/" + newListName);
        }
    })

    
})

app.get('/about', function(req, res) {
    res.render('about');
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});