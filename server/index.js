const express = require('express');
const app = express();
app.use(express.json());
const db = require('./config/db')();
const cors = require('cors')
app.use(cors())
const cookieParser = require('cookie-parser');
app.use(cookieParser())


//allow requests from my locahost
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000/home.html');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



//routes
const userRoute = require('./routes/users');
const taskRoute = require('./routes/tasks');
app.use('/users', userRoute);
app.use('/tasks', taskRoute);
//deliver files
app.get('/login', (req, res)=>{
  res.sendFile(__dirname + "/public/login.html")

})

app.get('/signup', (req, res)=>{
  res.sendFile((__dirname + "/public/register.html"))
})

app.get('/home', (req, res)=>{
  res.sendFile((__dirname + '/public/home.html'))
})
app.use(express.static('public'));
//models
const userModel = require('./models/users')(db)
const taskModel = require('./models/tasks')(db)
const relations = require('./models/relationships')(userModel, taskModel)

db.sync({alter: true})
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database synchronization error:", error);
  });
