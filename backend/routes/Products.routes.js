const express = require("express");
const {insertProducts, purchaseProduct, getUsersOrders, searchProducts} = require("../controllers/Products.controller")

// router

const router = express.Router();

router.post("/insertproducts", insertProducts);
router.post("/purchase", purchaseProduct);
router.get("/orderhistory/:userId", getUsersOrders)

// search

router.get("/search", searchProducts)

module.exports = router