const express = require("express");
const { config } = require("dotenv");
const productsRouter = require("./routes/Products.route");
const cardRouter = require("./routes/Cart.route");
const usersRouter = require("./routes/Users.route");
const error = require("./middlewares/error");
const cookiePaser = require("cookie-parser");
const cors = require("cors");
const upload = require("./middlewares/uploadFile");

config({
  path: "./config/.env",
});
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true,limit: "50mb" }));
app.use(express.json({limit:"50mb"}));
app.use(cookiePaser());

// routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cardRouter);
app.use("/api/v1/user/", usersRouter);

// console.log("limits" + limit)

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/hello",upload.array('images', 4),async (req, res) => {
  try {
    const { name, description, price, sizes } = req.body;
    // const images = req.files.map((file) => ({
    //   data: file.buffer.toString('base64'),
    //   contentType: file.mimetype,
    // }));
    console.log("🚀 ~ file: app.js:40 ~ images ~ images:", req)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.use(error);

module.exports = app;
