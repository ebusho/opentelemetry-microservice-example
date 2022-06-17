const express = require("express");
const fetch = require("node-fetch");

const port = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', async (req, res) => {
  res.send('Hello from Orders service');
})

// orders per user {username}
app.get('/orders/:username', async (req, res) => {
  try {
    const requestTimestamp = new Date()

    const response = await fetch(`http://users-api:3000/users/${req.params.username}`);
    const userData = await response.json();

    res.json({
      user: userData.user,
      orders: [{
        id: 0102,
        date: new Date(),
        products: [{
            id: 111,
            quantity: 2,
            unitPrice: 13.08
          },
          {
            id: 222,
            quantity: 1,
            unitPrice: 0.45
          }
        ],
        totalPrice: 26.61
      }],
      "@metadata": {
        requestDuration: `${new Date() - requestTimestamp} ms`
      }
    });
  } catch (err) {
    console.error(err)
  }
})

app.listen(port, () => {
  console.log(`Orders service listening on port ${port}`)
})
