// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Load MongoDB connection string from .env file
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const websiteSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

const Website = mongoose.model('Website', websiteSchema);

app.use(bodyParser.json());

// CRUD Operations

// Create a new website
app.post('/api/websites', async (req, res) => {
  try {
    const newWebsite = new Website(req.body);
    const savedWebsite = await newWebsite.save();
    res.json(savedWebsite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all websites
app.get('/api/websites', async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a website by ID
app.get('/api/websites/:id', async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }
    res.json(website);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a website by ID
app.put('/api/websites/:id', async (req, res) => {
  try {
    const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWebsite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a website by ID
app.delete('/api/websites/:id', async (req, res) => {
  try {
    const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
    res.json(deletedWebsite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
