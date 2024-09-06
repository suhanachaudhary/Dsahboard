const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv=require("dotenv");

const Session=require("./models/session");
const Availability=require("./models/availability");
const Admin=require("./models/admin");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongo_url=process.env.MONGODB_URL;
const JWT_SECRET = process.env.SECRET_KEY; // Replace with your secret key

if (!mongo_url) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1); 
  // Exit the process if MongoDB URI is missing
}
// MongoDB connection
mongoose.connect(mongo_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>
  console.log("Mongodb connected")
)
.catch((err)=>{
  console.group("Unable to connect:",err.message);
});


// const seedAdmin = async () => {
//   const email = "john212@gmail.com";
//   const password = "john@123"; // Set your admin password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingAdmin = await Admin.findOne({ email });
//   if (!existingAdmin) {
//     const admin = new Admin({ email, password: hashedPassword });
//     await admin.save();
//     console.log("Admin user seeded successfully");
//   } else {
//     console.log("Admin already exists, skipping seeding");
//   }

// };
// seedAdmin();

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};



// Routes

// Add availability
app.post('/availability', async (req, res) => {
    const { user, start, end } = req.body;
    const availability = new Availability({ user, start, end, duration: 30, scheduledSlots: [] });
    await availability.save();
    res.send(availability);
  
});

// Get all availability
app.get('/availability', async (req, res) => {
  const availabilities = await Availability.find();
  res.send(availabilities);
});

// Admin login route
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
try{
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
}catch(error){
  console.error("Error during login:", error);
    res.status(500).send({ message: 'Internal server error' });
}
});



// Schedule a session
app.post('/sessions', async (req, res) => {
  const { user, start, end ,isAdmin } = req.body;
  const session = new Session({ user, start, end,isAdmin, attendees: [] });
  await session.save();
  res.send(session);
});

// Get all sessions
app.get('/sessions', async (req, res) => {
  const sessions = await Session.find();
  res.send(sessions);
});

// Get all sessions created by admin
app.get('/sessions/admin', async (req, res) => {
  const adminSessions = await Session.find({ isAdmin: true }); // Filter by admin
  res.send(adminSessions);
});

// // Delete a session (Admin only)
// app.delete('/sessions/:id', async (req, res) => {
//   const { email } = req.body; // Assuming email is sent in the request body for authentication
//   const { id } = req.params;

//   if (email === ADMIN_EMAIL) {
//     await Session.findByIdAndDelete(id);
//     res.send({ message: 'Session deleted successfully' });
//   } else {
//     res.status(403).send({ message: 'Only admins can delete sessions' });
//   }
// });

app.delete('/sessions/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  if (req.user.email === "admin@example.com") { // Replace with actual admin check logic
    await Session.findByIdAndDelete(id);
    res.send({ message: 'Session deleted successfully' });
  } else {
    res.status(403).send({ message: 'Only admins can delete sessions' });
  }
});
// Start server
const port =process.env.PORT ||3000;
    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
