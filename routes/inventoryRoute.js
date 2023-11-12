const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');
const utilities = require("../utilities/")
const regValidate = require('../utilities/inventory-validation')

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:invId", utilities.handleErrors(invController.BuildByVehicleId));

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

router.get("/detail/:vehicleId", utilities.handleErrors(invController.BuildByVehicleId))

router.get("/", utilities.handleErrors(invController.BuildManagement))

router.get("/add-classification", utilities.handleErrors(invController.BuildAddClassification))

router.post("/add-classification", regValidate.classificationRules(), regValidate.checkClassificationData, 
utilities.handleErrors(invController.AddNewClassification))
        
router.get("/add-inventory", utilities.handleErrors(invController.BuildAddInventory))

router.post("/add-inventory", regValidate.inventoryRules(), regValidate.checkInventoryData, 
utilities.handleErrors(invController.AddNewInventory))




module.exports = router;