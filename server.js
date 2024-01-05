const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB (replace 'your_mongodb_uri' with your MongoDB URI)
mongoose.connect('mongodb+srv://admin:Abcd1234@portfolio.hnfr92l.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose model for the contact form data
const ContactModel = mongoose.model('Contact', {
  name: String,
  email: String,
  message: String,
});

// Handle form submissions
app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save form data to MongoDB
    const contact = new ContactModel({ name, email, message });
    await contact.save();

    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});