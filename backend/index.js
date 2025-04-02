require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://shopper-frontend-7xgk.onrender.com",
    credentials: true,
}));

// Database Connection With MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://vkaran0915:2000@cluster0.qylxt.mongodb.net/e-commerce", {

})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static(path.join(__dirname, 'upload', 'images')));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "File upload failed" });
    }
    res.json({
        success: true,
        image_url: `${process.env.SERVER_URL || "http://localhost:" + port}/images/${req.file.filename}`,
    });
});

// Schema for Products
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        
        const product = new Product({ ...req.body, id });
        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ id: req.body.id });
        if (!result) return res.status(404).json({ success: false, error: "Product not found" });
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Failed to remove product" });
    }
});

app.get('/allproducts', async (req, res) => {
    try {
        res.json(await Product.find({}));
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, error: "Failed to fetch products" });
    }
});

// Schema for Users
const User = mongoose.model('User', {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
});

app.post('/signup', async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({ success: false, error: "Email already in use" });
        }
        const user = new User({ ...req.body, cartData: Array(300).fill(0) });
        await user.save();
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || req.body.password !== user.password) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET || 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret_ecom').user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

app.post('/getcart', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('cartData');
        if (!user) return res.status(404).json({ success: false, error: "User not found" });
        res.json({ success: true, cartData: user.cartData });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.listen(port, () => console.log("Server Running on Port", port));
