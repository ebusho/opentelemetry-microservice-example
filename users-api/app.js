const express = require("express");
const sleep = require('atomic-sleep')

const port = process.env.PORT || 1234;

const app = express();

// Allow CORS requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from users service');
})

app.get('/users/:username', (req, res) => {

  if (req.params.username == "alice") {
    sleep(3000)
  }

  res.json({
    id: Math.floor(Math.random() * 100),
    user: req.params.username,
    registrationDate: new Date()
  });
})

app.listen(port, () => {
  console.log(`User service listening on port ${port}`)
})
