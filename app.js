const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

const app = express();

const Employee = require("./model/employee");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json--For Inserting

app.use(bodyParser.json());

//Connect to database

mongoose.connect("mongodb://localhost:27017/mupugdb", {
  useNewUrlParser: true
});

mongoose.connection.on("success", function() {
  console.log("Connection open");
});

//Load view engine

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

//app routes

app.get("/", (req, res) => {
  Employee.find({}, (err, employeeData) => {
    res.render("index", {
      title: "This is Capgemini L&D",

      empData: employeeData,

      emg: "L&D Department"
    });
  });
});

app.get("/home", (req, res) => {
  res.render("home", {
    mydata: "This is my home page"
  });
});

app.get("/add", (req, res) => {
  res.render("addEmployee", {
    mydata: "This is my Add Page"
  });
});

app.post("/emp/adddata", function(req, res) {
  let emp = new Employee();

  emp.empid = req.body.eid;

  emp.empname = req.body.ename;

  emp.empdep = req.body.edep;

  emp.empsalary = req.body.esal;

  emp.save(function(err) {
    if (err) {
      console.log(err);

      return;
    } else {
      res.redirect("/");
    }
  });
});

app.get("/deleteemp/:id", function(req, res) {
  let queryDelete = { _id: req.params.id };

  Employee.remove(queryDelete, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
      app.get("/", (req, res) => {
        Employee.find({}, (err, employeeData) => {
          res.render("index", {
            title: "This is Capgemini L&D",

            empData: employeeData,

            emg: "L&D Department"
          });
        });
      });
    }
  });
});

//update
app.get('/searchemp/:id',function(req,res){
  Employee.findById(req.params.id,function(err,edata){
if(err){
  console.log(err);
}else{
  res.render('updateemployee',{
      data:edata
  });
}
  });
  
}); 
app.post('/emp/updatedata/:id',function(req,res){
  let emp={};
emp.empid=req.body.eid;
emp.empname=req.body.ename;
emp.empdep=req.body.edep;
emp.empsalary=req.body.esal;
  let query= {_id:req.params.id};

  Employee.update(query,emp,function(err){
      if(err){
          console.log(err);
          return;
      }else{
           res.redirect('/');
      }
  });
  });

//make the server run on port of any number

app.listen(1000, () => console.log("Server started!"));
