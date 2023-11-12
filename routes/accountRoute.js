const express = require("express")
const router = new express.Router
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')
const validate = require("../utilities/account-validation")



router.get("/register", utilities.handleErrors(accountController.buildRegister))

// router.post("/register", utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post("/register", regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))



module.exports = router