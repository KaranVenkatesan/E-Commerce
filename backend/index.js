const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "https://e-commerce-frontend-olive-zeta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://vkaran0915:2000@cluster0.qylxt.mongodb.net/e-commerce");
console.log("Connected");

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Serving Static Files
app.use("/images", express.static("upload/images"));

// Upload Image Endpoint
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
});

// Product Schema
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

// Add Product Endpoint
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
});

// Remove Product Endpoint
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

// Fetch All Products Endpoint
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// User Schema
const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});

// Signup Endpoint
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) return res.status(400).json({ success: false, error: "Existing User found with same email" });

    let cart = {}; 
    for (let i = 0; i < 300; i++) cart[i] = 0;
    
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();
    const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
    res.json({ success: true, token });
});

// Login Endpoint
app.post("/login", async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) return res.json({ success: false, error: "Wrong Email id" });

        if (req.body.password === user.password) {
            const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "Wrong Password" });
        }
    } catch (error) {
        res.json({ success: false, error: "Server Error" });
    }
});

// Fetch New Collection Endpoint
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    res.send(products.slice(1).slice(-8));
});

// Fetch Popular in Women Endpoint
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    res.send(products.slice(0, 4));
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ errors: "Please authenticate using a valid token" });

    try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Invalid token" });
    }
};

// Add to Cart Endpoint
app.post("/addtocart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemID] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

// Remove from Cart Endpoint
app.post("/removefromcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemID] > 0) userData.cartData[req.body.itemID] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
});

// Start Server
app.listen(port, (error) => {
    if (!error) console.log("Server Running on Port " + port);
    else console.log("Error :" + error);
});
