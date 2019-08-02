const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('server running on port 3000');
});

// Function callName() is executed whenever
// url is of the form localhost:3000/name
app.get('/name', callName);

function callName(req, res) {
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  const spawn = require('child_process').spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  // and arguments for the script

  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
  // so, first name = Mike and last name = Will
  // for more detail on spawn: https://www.youtube.com/watch?v=ojeiaroDQW8
  const process = spawn('python3', ['./hello.py', // this tells python to run hello.py file
    req.query.firstname, // first arg sent to python
    req.query.lastname]); // second arg sent to python

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', (data) => {
    res.send(data.toString());
  });
}
