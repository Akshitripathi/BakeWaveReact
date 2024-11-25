const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const {product_id, name, price, category,image } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newProduct = new Product({ product_id,name, price, category, image: imagePath });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
