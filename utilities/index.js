const invModel = require("../models/inventory-model")
const Util = {}
 
/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ************************
 * Constructs the classification select
 ************************** */
Util.getClassifications = async function (selectedClassification, req, res, next) {
  let data = await invModel.getClassifications();
  let selectList = '<select name="classification_id" id="select_classification" class="select-classification">';
  data.rows.forEach((row) => {
    let selected = "";
    if (selectedClassification == row.classification_id) {
      selected = "selected";
    }
    selectList += `<option value="${row.classification_id}" ${selected}>${row.classification_name}</option>`;
  });
  selectList += '</select>';
  return selectList;
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display" class="car-grid">'
      data.forEach(vehicle => {
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model
        + 'details"><img src="' + vehicle.inv_thumbnail
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else {
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}
 
/* **************************************
* Build the vehicle view HTML
* ************************************ */
Util.buildVehicleHtml = async function (data) {
  let vehicle = data[0]
  let grid
  if(data.length > 0){
    grid = '<div class="vehicle-content">'
   
 
      grid +=  '<img src="' + vehicle.inv_image
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
      +' on CSE Motors">'
 
      grid += '<div class="vehicle-details">'
        grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' Details</h2>'
        grid += '<span><b>Price:</b> $'
          + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '<p><b>Description:</b> ' + vehicle.inv_description + '</p>'
        grid += '<p><b>Color:</b> ' + vehicle.inv_color + '</p>'
        grid += '<p><b>Miles:</b> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
 
      grid += '</div>'
   
    grid += '</div>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}
 
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
 
 
module.exports = Util
 