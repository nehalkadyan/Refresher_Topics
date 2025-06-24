const express = require("express");
const {insertProducts, purchaseProduct, getUsersOrders} = require("../controllers/Products.controller")

// router

const router = express.Router();

router.post("/insertproducts", insertProducts);
router.post("/purchase", purchaseProduct);
router.get("/orderhistory/:userId", getUsersOrders)

module.exports = router