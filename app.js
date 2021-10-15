var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: '.' })
});

app.get('/api/supervisors', function (req, res) {
    res.sendFile('index.html', { root: '.' })
});

app.post('/api/submit', function (req, res) {
  //if name valid
  if (validateName(req.body.firstName) && validateName(req.body.lastName)) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    //if email OR phone checked
    if (req.body.emailBox && req.body.phoneBox) {
      res.send('Check Only One Box...');
    } else {
      if (req.body.emailBox || req.body.phoneBox) {
        if (req.body.emailBox) {
          //if email valid
          if (validateEmail(req.body.email)) {
            res.send(name + ' ' + req.body.email + ' ' + req.body.select + ' Submitted Successfully!');
          } else {
            res.send('Invalid Email...');
          }
        } else {
          //if phone valid
          if (validatePhone(req.body.phone)) {
            res.send(name + ' ' + req.body.phone + ' ' + req.body.select + ' Submitted Successfully!');
          } else {
            res.send('Invalid Phone...');
          }
        }
      } else {
        res.send('Please Check A Box...');
      }
    }
  } else {
    if (!validateName(req.body.firstName) || !validateName(req.body.lastName)) {
      res.send('Invalid Name...');
    }
  }
});

var server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000/...');
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(phone));
}

function validateName(name) {
    const re = /^[A-Za-z]+$/;
    return re.test(String(name));
}
