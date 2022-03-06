const express = require('express');
//const res = require('express/lib/response');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();


//Init Middleware
app.use(express.json())

app.use('/api/users/', require('./routes/api/users'));
app.use('/api/profile/', require('./routes/api/profile'));
app.use('/api/post/', require('./routes/api/post'));
app.use('/api/auth/', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.PORT === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})