import express from 'express';

const app = express();

app.get("/", function(request, response) {
    response.send('<h1>Hello World</h1>');
});

app.get("/contact", function(req, res) {
    res.send("Contact me at testing@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("Hi, I am an aspiring Web Developer!!");
});

app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Gaming</li><li>Programming</li><li>Gym</li>");
});

app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});