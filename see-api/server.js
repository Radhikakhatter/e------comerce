const express = require('express');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const port = 3000;
pp.use(bodyParser.json());

const url = 'mongodb+srv://radhikakhatter321:nSq8kofOTmS5V1Nl@prtgh.uja4kjw.mongodb.net/?retryWrites=true&w=majority&appName=Prtgh';
const dbName = 'orders';

// Connect to MongoDB
mongoose.connect('mongodb+srv://radhikakhatter321:nSq8kofOTmS5V1Nl@prtgh.uja4kjw.mongodb.net/?retryWrites=true&w=majority&appName=Prtgh')
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Get all orders
    app.get('/orders', (req, res) => {
      db.collection('orders').find().toArray((err, orders) => {
        if (err) {
          res.status(500).json({ error: 'Failed to retrieve orders' });
        } else {
          res.json(orders);
        }
      });
    });

    // Place a new order
    app.post('/orders', (req, res) => {
      const { customerName, customerEmail, phoneNumber, address, products, paymentMethod, paymentDetails } = req.body;
      const orderId = uuid.v4();
      const orderStatus = 'processing';

      db.collection('orders').insertOne({
        orderId,
        customerName,
        customerEmail,
        phoneNumber,
        address,
        products,
        paymentMethod,
        paymentDetails,
        orderStatus
      }, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Failed to place order' });
        } else {
          res.json({ orderId, orderStatus, message: 'Order placed successfully' });
        }
      });
    });

    // Update order status
    app.patch('/orders/:orderId', (req, res) => {
      const orderId = req.params.orderId;
      const { orderStatus } = req.body;

      db.collection('orders').updateOne({ orderId }, { $set: { orderStatus } }, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Failed to update order status' });
        } else {
          res.json({ message: 'Order status updated successfully' });
        }
      });
    });

    // Delete order
    app.delete('/orders/:orderId', (req, res) => {
      const orderId = req.params.orderId;

      db.collection('orders').deleteOne({ orderId }, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Failed to delete order' });
        } else {
          res.json({ message: 'Order deleted successfully' });
        }
      });
    });
  }
});


app.get('/', (req, res) => {
  res.send('seetheorderpage.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
