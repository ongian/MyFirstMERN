const express = require('express');
//const res = require('express/lib/response');
const connectDB = require('./config/db');

const app = express();

connectDB();

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API RUNNING'));

app.use('/api/users/', require('./routes/api/users'));
app.use('/api/profile/', require('./routes/api/profile'));
app.use('/api/post/', require('./routes/api/post'));
app.use('/api/auth/', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})