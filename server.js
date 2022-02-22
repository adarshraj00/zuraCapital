const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Product");
const cors = require("cors");
const app = express();
mongoose.connect(
  "mongodb+srv://adarsh-admin:AoUJo2luTwjrCDHv@cluster0.jjs5s.mongodb.net/zura"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb Connection Error:"));
db.once("open", () => {
  console.log("Mongodb Connection Successful");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
app.get("/", (req, res) => {
  res.send("hello world");
});

// to get the search data
app.get("/search/:text", async (req, res) => {
  let splitted=req.params.text.split(" ");
  
  let values = await Product.find({
    $or: [
      {
        name: { $regex: req.params.text, $options: "i" },
      },
      {
        brandName: { $regex: req.params.text, $options: "i" },
      },
      {
        description: { $regex: req.params.text, $options: "i" },
      }
    ],
  }).limit(10).select("listOfImages name -_id");
  console.log(values)
  res.status(200).send({products:values});
});

// to get the carousal images
app.get("/get-images/:count", async (req, res) => {
  const images = await Product.find({}, "listOfImages", {
    limit: req.params.count,
  });
  res.status(200).send({ images });
});

// to get single product data
app.get("/product", async (req, res) => {
  try {
    const product = await Product.findOne({});
    return res.status(200).send({ product });
  } catch (err) {
    res.status(400).send({ err });
  }
});
app.post("/product", async (req, res) => {
  try {
    console.log("test");
    console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
