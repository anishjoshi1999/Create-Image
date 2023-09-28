const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const axios = require("axios");

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

// Middleware to handle 503 responses and redirect to the home page
app.use((req, res, next) => {
  // Check if the response status is 503
  if (res.statusCode === 503) {
    // Redirect to the home page URL (you should replace '/home' with your actual home page URL)
    return res.redirect("/");
  }
  // If the response status is not 503, continue to the next middleware
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Trying Converting Text To Image");
});

app.get("/create", async (req, res) => {
  const apiUrl =
    "https://text-to-image-kui0.onrender.com/create-image-from-text";

  try {
    // Make a GET request to the specified URL using axios
    await axios.get(apiUrl);
    console.log("Image created successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error creating image:", error);
    // Handle the error and potentially redirect the user to an error page
    res.redirect("/"); // You can specify the error path
  }
});
