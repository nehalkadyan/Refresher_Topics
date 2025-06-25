const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

// insert products

const insertProducts = async (req, res) => {
  // insert bulk

  try {
    const { products } = req.body;

    const insertedProducts = await Product.insertMany(products);

    return res.status(201).json({
      message: "Products Inserted Successfully",
      products: insertedProducts,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

// making purchase

const purchaseProduct = async (req, res) => {
  try {
    const { products, userId } = req.body;
    // const userId = req.user.id;

    /*
           products : [
             {productId : "...", quantity : 2},
             {productId : "...", quantity : 3},
           ]
        */

    // total amount

    let totalAmount = 0;

    // tracking order
    let orderItems = [];

    for (let item of products) {
      // get the product
      const product = await Product.findById(item.productId);

      // check whether product exists and whether the stock is lesser than the quantity

      if (!product && product.stock < item.quantity) {
        return res
          .status(400)
          .json({
            message: "Product currenly unvailable or insufficient stock",
          });
      }

      // reduce the stock

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
      });

      // new order

      const newOrder = new Order({
        user: userId,
        products: orderItems,
        totalAmount,
      });

      // save order

      await newOrder.save();

      return res
        .status(201)
        .json({ message: "Order placed successfully", order: newOrder });
    }
  } catch (err) {
    console.log("Error purchasing product", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get purchase history

const getUsersOrders = async (req, res) => {
  try {
    // get user by id

    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .populate("user", "username email");

    return res
      .status(200)
      .json({ message: "Order history fetched successfully!", orders });
  } catch (err) {
    console.log("Error getting purchase history", err);

    return res.status(500).json({ message: "Internal server Error", err });
  }
};

const searchProducts = async(req, res) => {
  try{
     const {searchTerm, sortBy , order} = req.query;

     // search products

     const filter = {}

     if(searchTerm){
       filter.name = {$regex : searchTerm, $options: "i"}
     }

     //sort 

     // sort order

     const sortOrder = order === "desc" ? -1 : 1

     // sort criteria

     const sortCriteria = {}

     if(["price", "stock"].includes(sortBy)){
      sortCriteria[sortBy] = sortOrder;
     }

     /*
       sortCriteria = {
         stock : -1
       }
     */

       // pipeline

      const pipeline = [

        // stage 1 - ilter stage
        {
           $match: filter
        },

        // stage 2 - return only specified fields

        {
          $project: {
            name: 1,  // name field
            price: 1,  // price field
            // stock : 1  // stock field
          }
        },

        // sort - stage 3
        {
          $sort: sortCriteria
        }
      ]

    //  const products = await Product.find(filter).sort(sortCriteria);

    const products = await Product.aggregate(pipeline);

     return res.status(200).json({message : "Products searched!", products})

  }catch(err){
    console.log("Error searching products", err)
    return res.statusw(500).json({message : "Internal Server Error", err})
  }
}



module.exports = { insertProducts, purchaseProduct, getUsersOrders, searchProducts };
