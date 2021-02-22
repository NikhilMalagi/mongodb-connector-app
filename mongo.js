const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://malagin:pOH3E7YMOLP9EyaN@cluster0.z42vh.mongodb.net/products_test?retryWrites=true&w=majority";
const uri = "mongodb+srv://malagin:pOH3E7YMOLP9EyaN@cluster0.z42vh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  /* Does not initate the connection : only creates a client instance with the URL */
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(newProduct);
  } catch (error) {
    return res.json({ message: 'Could not store data.', error });
  };
  client.close();
  res.json(newProduct);
  // client.connect(err => {
  //   // if (err) {
  //   //   return res.json({ message: 'Could not store data.', err });
  //   // }
  //   const db = client.db();
  //   const result = db.collection('products').insertOne(newProduct);
  //   // perform actions on the collection object
  //   client.close();
  //   res.json(newProduct);
  // });

};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    /* find : returns a cursor to the list of docs and need to go through the array */
    products = await db.collection('products').find().toArray();
  } catch (error) {
    return res.json({ message: 'Could not retrieve products.' });
  };
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
