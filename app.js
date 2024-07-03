// app.js

// import dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path')

const ejs = require('ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


// Define routes
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'templates', 'index.html');
  res.sendFile(filePath)
  // console.log(filePath)
});

app.get('/contact', (req, res) => {
  const filePath = path.join(__dirname, 'templates', 'contact.html');
  res.sendFile(filePath)
  // console.log(filePath)
});

app.get('/about', (req, res) => {
  const filePath = path.join(__dirname, 'templates', 'about.html');
  res.sendFile(filePath)
  // console.log(filePath)
});

app.get('/admin', (req, res) => {
  const filePath = path.join(__dirname, 'templates', 'adminlogin.html');
  res.sendFile(filePath)
  // console.log(filePath)
});





// const mongoose = require('mongoose')

// const uri = "mongodb://username:password@localhost:27017/";
// mongoose.connect('mongodb://localhost:27017/test').then(()=>{
//     console.log('connect sucessfully')
// })


// Admin login






const mongoose = require('mongoose');
// MongoDB connection URI
const uri = process.env.uri

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });



const messageSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);






// POST request handler for login route

let usern = process.env.username
let passw = process.env.password

app.post('/login', async (req, res) => {
  // Access form data from req.body
  const { username, password } = req.body;

  // Your authentication logic goes here

  if (username === usern && passw === password) {
    try {
      // Fetch all messages from the database
      const messages = await Message.find();

      // Render the admin.ejs template with messages data
      ejs.renderFile('templates/admin.ejs', { messages }, (err, renderedTemplate) => {
        if (err) {
          console.error('Error rendering template:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Send the rendered HTML as response
        res.send(renderedTemplate);
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    console.log('Check username or password');
    res.send('Check username or password');
  }
});



// mongodb+srv://rohancrchatse:<password>@rohan.qdhzkmy.mongodb.net/



// Code for get data from user and store in database 

app.post('/storedata', async (req, res) => {
  console.log(req.body); // Log req.body to inspect its contents

  // Access form data from req.body
  const email = req.body.email;
  const phoneNo = req.body.phone;
  const message = req.body.message;
  const name = req.body.username;


  // This is schema 
  const newMessage = new Message({
    username: name,
    email: email,
    phone: phoneNo,
    message: message
  })

  // Save the new message to the database
  const savedMessage = await newMessage.save();

  res.redirect('/contact')

  // res.status(201).json(savedMessage);



});




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








