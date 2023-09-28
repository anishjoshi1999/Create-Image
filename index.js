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

// Routes
app.get("/", (req, res) => {
  res.send("Trying Converting Text To Image");
});

app.get('/create', async (req, res) => {
  const apiUrl = 'https://text-to-image-kui0.onrender.com/create-image-from-text';

  try {
    const response = await axios.get(apiUrl);
    console.log(response);

    if (response.status === 503) {
      console.log('Received 503 status code, redirecting to homepage');

      // Set the response status code to 200 before redirecting
      res.status(200).redirect('/');
    } else {
      console.log('Image created successfully');
      res.redirect('/');
    }
  } catch (error) {
    // If there's an error (including a 503 response), this block is executed.
    // You are redirecting to the homepage in case of an error.
    res.redirect('/');
    console.log('Error while making the API request:', error);
  }
});
  
