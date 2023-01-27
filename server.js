const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const axios = require('axios');
const sstk = require("shutterstock-api");



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

sstk.setAccessToken('v2/MmJNMEx5ZDRoWHppcnpFc2ViNlJLSUZvSXBybXpZUUMvMzY5Mzg4NTkxL2N1c3RvbWVyLzQvTDhzU0FkU1hXVW5ORk9ySDJiWVR2VFp3VzEwZDNpU3NRVV85WUgyMHp3UzlQdjVwVUZvbzdZTVpXb1lVRXJ0ZEdNMGNNdFhuejdFQzZ5UGFfa1A4aFNnQnZRekRtNXc5aEt3VGhoRGtFVmRSYjdnd2gtRHBCVTE4NkNpeG5IZTREYllCUkJIVlpBNkx3Y0lqV2ZkMERlWWF3aDlUWTNVN1BtTUQyMDQzcGRjMl9GeDBkSDNxc05zV2dmV3ZCeFNQY0pITEZPaFVUZnV1ZV9INVpxZ2tWUS9EWU54X1Rua1pDOGJaR3QtWFJ3QmFB');

const imagesApi = new sstk.ImagesApi();

app.use(express.json())

// We need body parser in order for our json body to be populated
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// We need to make sure to allow our FE domain to call our BE
// We need to set CORS to allow it by setting the headers below for our API
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3004"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const users = []

app.get('/users',  (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')  
    } else {
      res.send('Not Allowed')  
    }
  } catch {
    res.status(500).send()
  }
})

app.post('/images', async (req, res) => { 
  console.log('getting images')
  const queryParams = {
    "query": req.body.search
  };
  imagesApi.searchImages(queryParams)
  .then(({data}) => {
    console.log(data);
    res.status(200).send(data)
  })
  .catch((error) => {
    console.error(error);
  });
})

app.listen(5000, function() {
 console.log('Listening on Port 5000')
})


