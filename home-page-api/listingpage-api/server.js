const express = require('express');
const app = express();
const port = 3000;
const apiKey =uuid.v4();

app.get('/', (req, res) => {
  res.send('listingpage.html');
});
app.post ('/orders',(req,res)=>
{const { customerName, customerEmail, phoneNumber, address, products, paymentMethod, paymentDetails } = req.body;

// Process order logic here...

res.json({
  orderId: 12345,
  orderStatus: 'processing',
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



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
