// get the form element
const form = document.getElementById('order-form');

// add event listener to the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // get the form data
  const formData = new FormData(form);

  // validate the form data
  if (!validateFormData(formData)) {
    alert('Please fill in all the required fields');
    return;
  }

  // calculate the order summary
  const orderSummary = calculateOrderSummary(formData);

  // display the order summary
  displayOrderSummary(orderSummary);

  // submit the form data to the server
  submitFormData(formData);
});

// validate the form data
function validateFormData(formData) {
  const requiredFields = ['name', 'email', 'phone', 'address', 'ship-name', 'ship-address', 'payment-method', 'card-number', 'expiration-date', 'cvv'];

  for (const field of requiredFields) {
    if (!formData.get(field)) {
      return false;
    }
  }

  return true;
}

// calculate the order summary
function calculateOrderSummary(formData) {
  const products = [];
  const totalPrice = 0;

  // add products to the order summary
  for (const product of formData.getAll('product')) {
    const productPrice = parseFloat(product.price);
    const productQuantity = parseInt(product.quantity);
    const productTotal = productPrice * productQuantity;

    products.push({
      name: product.name,
      quantity: productQuantity,
      price: productPrice,
      total: productTotal,
    });

    totalPrice += productTotal;
  }

  return {
    products,
    totalPrice,
  };
}

// display the order summary
function displayOrderSummary(orderSummary) {
  const orderSummaryTable = document.getElementById('order-summary');
  const tableBody = orderSummaryTable.tBodies[0];

  // clear the table body
  tableBody.innerHTML = '';

  // add products to the table body
  for (const product of orderSummary.products) {
    const row = tableBody.insertRow();
    const nameCell = row.insertCell();
    const quantityCell = row.insertCell();
    const priceCell = row.insertCell();
    const totalCell = row.insertCell();

    nameCell.textContent = product.name;
    quantityCell.textContent = product.quantity;
    priceCell.textContent = `$${product.price.toFixed(2)}`;
    totalCell.textContent = `$${product.total.toFixed(2)}`;
  }

  // add total row
  const totalRow = tableBody.insertRow();
  const totalCell = totalRow.insertCell();
  totalCell.colSpan = 4;
  totalCell.textContent = `Total: $${orderSummary.totalPrice.toFixed(2)}`;
}

// submit the form data to the server
function submitFormData(formData) {
  // todo: implement server-side submission
  console.log(formData);
} 