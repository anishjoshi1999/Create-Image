const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const axios = require("axios");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

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

// Routes
app.get("/", (req, res) => {
  res.send("Trying Converting Text To Image");
});

app.get("/create", async (req, res) => {
  try {
    // Define the URL for the GET request
    const apiUrl =
      "https://text-to-image-f1zm.onrender.com/create-image-from-text";

    // Make a GET request to the specified URL using axios
    await axios.get(apiUrl);
    console.log("Image created successfully");
    res.redirect("/");
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error.message);
    res.redirect("/");
    //res.status(500).json({ error: "An error occurred" });
  }
});