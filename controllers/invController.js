const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
 
const invCont = {}
 
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}
 
/* ***************************
 *  Build vehicle details by vehicle view
 * ************************** */
invCont.BuildByVehicleId = async function (req, res, next) {
  const vehicle_id = req.params.invId
  const data = await invModel.getInventoryById(vehicle_id)
  const grid = await utilities.buildVehicleHtml(data)
  let nav = await utilities.getNav()
  res.render("./inventory/car-details", {
    title: data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model,
    nav,
    grid,
  })
}


invCont.BuildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}
invCont.BuildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_id } = req.body;
  const selectList = await utilities.getClassifications(classification_id);
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    selectList,
    errors: null,
  });
}

invCont.BuildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_id } = req.body;
  const selectList = await utilities.getClassifications(classification_id);
  
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    selectList,
    errors: null,
  });
}

invCont.AddNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { 
    add_classification, 
    classification_id 
  } = req.body

  let selectList = await invModel.getClassifications(classification_id)

  const classResult = await invModel.addClassification(add_classification)

  if (classResult) {
    
    req.flash(
      "notice",
      `Congratulations, you\'ve created the ${add_classification} classification!`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      selectList,
    })
  } else {
    req.flash("notice", "Sorry, that classification did not work. Please try again")
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

invCont.AddNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  
  const { 
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  let selectList = await invModel.getClassifications(classification_id)

  const invResult = await invModel.addInventory(
    
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    )


  if (invResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${inv_make} ${inv_model} to the inventory!\n`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      selectList,
    })
  } else {
    req.flash("notice", "Sorry, there was an issue adding a new vehicle. Please try again.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: null,
      selectList,
    })
  }
}



 
module.exports = invCont