// const express = require("express");
const path = require("path");
// const app = express();
const bodyparser = require('body-parser');
const port = 80;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/loginform");
}

//defining schema
const loginSchema = new mongoose.Schema({
  npassword:String,
  nemail: String
});

const login = mongoose.model("login", loginSchema);


// app.use("/static", express.static("static"));
// app.use(express.urlencoded());

app.set("view engine", "html");
app.set("WEBSITE", path.join(__dirname, "WEBSITE"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("login.html", params);
});

app.post("/", (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
      res.send("this item has been saved to database");
    }).catch(()=>{
      res.status(404).send("item was not saved to the database");
    })

});

app.listen(port, () => {
    console.log(`the application successfully started on port ${port}`);
  });