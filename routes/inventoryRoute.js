// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const regValidate = require('../utilities/inventory-validation')
const utilities = require("../utilities")
const Util = require("../utilities")


router.get(
  "/type/:classificationId", 
  utilities.handleErrors(invController.buildByClassificationId)
)

router.get(
  "/detail/:vehicleId", 
  utilities.handleErrors(invController.BuildByVehicleId)
)



router.get(
  "/", 

  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.BuildManagement)
  )



router.get(
  "/add-classification", 
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.BuildAddClassification)
  )



router.post(
    "/add-classification",
    regValidate.checkAccountAccess,
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.AddNewClassification)
)



router.get(
  "/add-inventory", 
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.BuildAddInventory)
  )


router.get(
  "/management", 
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.BuildManagement)
)


router.get(
  "/getInventory/:classification_id",
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.getInventoryJSON)
)


router.post(
  "/add-inventory",
  regValidate.checkAccountAccess,
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,  
  utilities.handleErrors(invController.AddNewInventory)  
)


router.get(
  "/edit/:inv_id",
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.editInventoryView)
)

router.post(
  "/update/", 
  regValidate.checkAccountAccess,
  regValidate.inventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)


router.get(
  "/delete/:inv_id", 
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.deleteView)
)

router.post(
  "/delete", 
  regValidate.checkAccountAccess,
  utilities.handleErrors(invController.deleteItem)
)


module.exports = router;