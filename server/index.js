const express = require('express');
const app = express();
app.use(express.json());
const db = require('./config/db')();
const cookieParser = require('cookie-parser');
app.use(cookieParser())





//routes
const userRoute = require('./routes/users');
const taskRoute = require('./routes/tasks');
app.use('/users', userRoute);
app.use('/tasks', taskRoute);

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
