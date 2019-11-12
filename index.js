//Import packages
const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");

//Configure express server and body parser
const app = express();
app.use(bodyparser.json());

//Create MySQL connection
const dbconnection = mysql.createConnection({
  host: "localhost",
  user: "abhishek_dev",
  password: "Root123$",
  database: "nodejs"
});

dbconnection.connect(err => {
  if (!err) console.log("DB r̥connection established successfully");
  else
    console.log(
      "Failed to establish connection " + JSON.stringify(err, undefined, 2)
    );
});

//Configure HTTP port to start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Fetch book details by using GET router
app.get("/books", (req, res) => {
  dbconnection.query("select * from bookdetails", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log("Error fetching details");
  });
});

//Fetch book details for specific ID passed through path params
app.get("/books/:id", (req, res) => {
  dbconnection.query(
    "select * from bookdetails where book_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log("Error fetching details");
    }
  );
});

//Insert details of new book into DB
app.post("/newbook", (req, res) => {
  const insertbook = {
    book_id: req.body.book_id,
    book_name: req.body.book_name,
    book_author: req.body.book_author
  };

  console.log(insertbook);
  dbconnection.query(
    "insert into bookdetails SET ?",
    insertbook,
    (err, resp) => {
      if (!err) res.send("Book details added successfully");
      else throw err;
    }
  );
  console.log("abc");
});

//Update book details
app.put("/updatebook", (req, res) => {
  const bookId = req.body.book_id;
  const bookName = req.body.book_name;
  const bookAuthor = req.body.book_author;
  var bookArr = [bookName, bookAuthor, bookId];
  dbconnection.query(
    "update bookdetails set book_name = ?, book_author = ? where book_id = ?",
    bookArr,
    (err, resluts, fields) => {
      if (!err) res.send("Book details updated successfully");
      else console.log("Error while updating book details");
    }
  );
});
