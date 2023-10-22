/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")

/* ***********************
 * View Engine and Templates
 *************************/

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root 

/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)

app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page" })
})
/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
// Express Error Handler
app.use(async (err, req, res, next) => {
  const utilities = require('./utilities'); // Import utilities here
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("partials/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/

const port = process.env.PORT
const host = process.env.HOST
 

/* ***********************
 * Log statement to confirm server operation
 *************************/

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
