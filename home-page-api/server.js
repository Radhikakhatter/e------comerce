







const express = require('express');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());

const url = 'mongodb+srv://radhikakhatter321:nSq8kofOTmS5V1Nl@prtgh.uja4kjw.mongodb.net/?retryWrites=true&w=majority&appName=Prtgh';
const dbName = 'home';

// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Get home page data
    app.get('/home', (req, res) => {
      db.collection('home').find().toArray((err, data) => {
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve home page data' });
        } else {
          res.json(data);
        }
      });
    });

    // Get featured products
    app.get('/featured-products', (req, res) => {
      db.collection('products').find({ featured: true }).toArray((err, products) => {
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve featured products' });
        } else {
          res.json(products);
        }
      });
    });

    // Get latest products
    app.get('/latest-products', (req, res) => {
      db.collection('products').find().sort({ createdAt: -1 }).limit(10).toArray((err, products) => {
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve latest products' });
        } else {
          res.json(products);
        }
      });
    });

    // Search products
    app.get('/search-products', (req, res) => {
      const query = req.query.q;
      db.collection('products').find({ name: { $regex: query, $options: 'i' } }).toArray((err, products) => {
        if (err) {
          res.status(500).json({ error: 'Failed to search products' });
        } else {
          res.json(products);
        }
      });
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


