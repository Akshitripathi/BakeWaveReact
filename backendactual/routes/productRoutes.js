const express = require('express');
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/products', productController.getProducts);

router.post('/products', upload.single('image'), productController.createProduct);

module.exports = router;
