const mongoose = require('mongoose');

const Product = require('./models/product');

/* Connection pooling : Mongooose uses it to maintain the connections 
   connect returns a promise
*/
mongoose.connect(
  "mongodb+srv://malagin:pOH3E7YMOLP9EyaN@cluster0.z42vh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).then(() => {
  console.log('Connected to database!')
}).catch(() => {
  console.log('Connection failed!')
});

const createProduct = async (req, res, next) => {
  /* Model is a constructor function */
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });

  /* Mongo adds the _id property to the model even before it is saved */

  /* save() takes care of connection to the mentioned database in the URL,collection name in the model */
  const result = await createdProduct.save();
  /* Can convert the property using the getter method .id -> from object to string */
  console.log(typeof createdProduct._id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  /* find : static method on the model constructor,returns Array unlike the mongo find which returns the array 
     Returns a thenable,can be converted to Prmoise using exec()
  */
  const products = await Product.find().exec();
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
