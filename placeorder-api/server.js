const express = require('express');
const app = express();
const  uuid = require('uuid');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Generate API key
const apiKey = uuid.v4();

// Place Order endpoint
app.post('/orders', (req, res) => {
  const { customerName, customerEmail, phoneNumber, address, products, paymentMethod, paymentDetails } = req.body;

  // Process order logic here...
  const orderId = uuid.v4();
  const orderStatus = 'processing';

  res.json({
    orderId,
    orderStatus,
    message: 'Order placed successfully'
  });
});

// API key validation middleware
const apiKeyMiddleware = (req, res, next) => {
  const providedApiKey = req.headers['mongodb+srv://radhikakhatter321:nSq8kofOTmS5V1Nl@prtgh.uja4kjw.mongodb.net/?retryWrites=true&w=majority&appName=Prtgh'];

  if (providedApiKey !== apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

app.use(apiKeyMiddleware);


const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('placeorder.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
