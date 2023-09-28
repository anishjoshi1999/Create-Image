const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const axios = require('axios'); // Import Axios

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connection to Database
const MONGODB_URI = `${process.env.MONGODB_URI}`;
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
// Enable CORS
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Trying Converting Text To Image");
});

app.get("/create", (req, res) => {
  const apiUrl = "https://text-to-image-kui0.onrender.com/create-image-from-text";

  try {
    axios.get(apiUrl); // Use Axios to make the GET request
    console.log("Hit the target route");
    res.redirect("/");
    
  } catch (error) {
    console.log("Error making external request");
    res.redirect("/");
  }
});
