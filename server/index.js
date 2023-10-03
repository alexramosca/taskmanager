const express = require('express');
const app = express();
app.use(express.json());
const db = require('./config/db')();
//routes
const userRoute = require('./routes/users');
app.use('/users', userRoute);

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
