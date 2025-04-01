require("dotenv").config(); 

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://shopper-frontend-7xgk.onrender.com",
    credentials: true,
}));

// Database Connection With MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://vkaran0915:2000@cluster0.qylxt.mongodb.net/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error: ", err));

//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images 
app.use('/images', express.static(path.join(__dirname, 'upload', 'images')));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, error: "File upload failed" });
    }
    res.json({
        success: 1,
        image_url: `${process.env.SERVER_URL || "http://localhost:" + port}/images/${req.file.filename}`,
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            error: "Failed to add product"
        });
    }
});

// Creating API for deleting products 
app.post('/removeproduct', async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ id: req.body.id });
        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            error: "Failed to remove product"
        });
    }
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch products"
        });
    }
});

// Schema creating for user model 
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // for user can't create another ac with same email id 
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating end point for registering the user
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing User found with same email id" });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
            }
        };
        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
});

// Creating end point for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    }
                };
                const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
                res.json({ success: true, token });
            }
            else {
                res.status(400).json({ success: false, error: "Wrong Password" });
            }
        }
        else {
            res.status(400).json({ success: false, error: "Wrong Email id" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Creating end point for newcollection data 
app.get('/newcollection', async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("New Collection fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error fetching new collection:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch new collection"
        });
    }
});

// Creating end point for popular in women section
app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popular_in_women = products.slice(0, 4);
        console.log("popular in women fetched");
        res.send(popular_in_women);
    } catch (error) {
        console.error("Error fetching popular in women:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch popular in women"
        });
    }
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET || 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        
        if (!userData) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Creating endpoint for remove products in cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        
        if (!userData) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        
        if (userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    }
    else {
        console.log("Error :" + error);
    }
});