var router = require('express').Router();
var EMPLOYEECLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.render('index');
}

// api here

router.get('/api/v7/read', do_read);
router.post('/api/v7/create', do_create);
router.put('/api/v7/update', do_update);
router.delete('/api/v7/delete/:_id', do_delete);

function do_read(req, res) {
  console.log('getting all data');
  EMPLOYEECLASS.find()
    .then(function (results) {
        console.log(results);
        res.json(results);
    });
}

function do_create(req, res) {
  console.log('creating user');
  console.log(req.body);

  var data = {
    name: req.body.name,
    gender: req.body.gender,
    contact: {
      email: req.body.email,
      cell: req.body.cell,
      home: req.body.home
    }
  }

  var employee = new EMPLOYEECLASS(data);
  employee.save()
    .then(function (result) {
        console.log(result);
        res.json({message: 'saved new employee!'})
    });
}

function do_update(req, res) {
  console.log('updating user');
  console.log(req.body);
  var update = {
    $set: {
      name: req.body.name,
      gender: req.body.gender,
      contact: {
        email: req.body.email,
        cell: req.body.cell,
        home: req.body.home
      }
    }
  }
  EMPLOYEECLASS.findByIdAndUpdate(req.body._id, update)
    .then()
}

function do_delete(req, res) {
  console.log('deleting user');
  console.log(req.params._id);
  EMPLOYEECLASS.findByIdAndRemove(req.params._id)
    .then();
}