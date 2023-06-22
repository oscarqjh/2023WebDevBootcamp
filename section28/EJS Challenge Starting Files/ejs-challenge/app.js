import express from "express";
import bodyParser from "body-parser";
import _ from 'lodash';

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// app settings
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// global var
const homePost = {
  title: "",
  mainContent: homeStartingContent
}
const posts = [];

// get for home
app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
})

// get for posts
app.get('/posts/:postID', function(req, res) {
  let post;
  if (post = posts.find(e => _.kebabCase(e.title) === _.kebabCase(req.params.postID))) {
    res.render('post', {
      title: post.title,
      mainContent: post.mainContent
    })
  } else {
    console.log('not found');
    res.redirect('/fail');
  }
})

// get for 404
app.get('/fail', function(req,res) {
  res.render("fail");
})

// get for about
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
})

// get for contact
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})

// get for compose
app.get("/compose", function(req, res) {
  res.render("compose");
})

// post for compose
app.post("/compose", function(req,res) {
  const post = {
    title: req.body.title,
    mainContent: req.body.mainContent
  };
  posts.push(post);
  res.redirect("/");
})

// listen port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
