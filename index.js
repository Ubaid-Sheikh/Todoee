const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Todo = require("./models/TodoModel");

const db =
  "mongodb+srv://Ubaid:mongodbatlas@nodepractice.zda3n3s.mongodb.net/Todo?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/todos", (req, res) => {
  Todo.find().sort({createdAt: -1})
  .then((result) => {
    res.render("todos", { todos: result });
  }).catch((err)=>{
    console.log(err);
  })
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((result) => {
      res.render("details", { todo: result });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.post("/todos", (req, res) => {
  const newTask = new Todo(req.body);
  newTask
    .save()
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/delete/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
});


// app.get("/update/todos/:id", (req, res)=>{
//   const id = req.params.id;
//   Todo.findByIdAndUpdate(id).then((result) => {
//     res.redirect("/todos");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });


