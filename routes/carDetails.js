const express = require('express');
const router = express.Router();
const invModel = require("../models/inventory-model");

// Define a route for displaying car details
router.get('/inv/detail/:carId', async (req, res) => {
  const inv_id = req.params.inv_id;
  const getInventoryById = await invModel.getInventoryById(inv_id); // Fetch car details by ID

  if (getInventoryById) {
    res.render('car-detail', { getInventoryById }); // Render the car-details view with car details data
  } else {
    // Handle the case where the car ID is not found (e.g., show an error page)
    res.render('errors/error', { title: 'Car Not Found', message: 'The requested car was not found' });
  }
});

// Other routes and middleware...

module.exports = router;
