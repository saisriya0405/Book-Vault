const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./backend/models/User'); // Ensure this path is correct

console.log('Looking for User model at:', path.resolve(__dirname, './backend/models/User.js'));

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your actual MongoDB connection string
const MONGO_URI = "mongodb+srv://saisriya0405:saisriya@cluster0.jyozhty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Make sure to replace <username> and <password> with your actual MongoDB Atlas credentials
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Signup API
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ success: true, message: 'User  registered successfully.' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
