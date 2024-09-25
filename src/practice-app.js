require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000; 
const webRoute = require('./routes/user.routes');

const Role  = require('./models/role.model')

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {

})
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

// Cấu hình middleware để xử lý JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khai báo route
app.use('/', webRoute);

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



function initial() {
  Role.estimatedDocumentCount()
    .then(count => {
      if (count === 0) {
        const userRole = new Role({ name: "user", role_status: "ACTIVE" });
        const adminRole = new Role({ name: "admin", role_status: "ACTIVE" });

        userRole.save()
          .then(() => console.log("added 'user' to roles collection"))
          .catch(err => console.log("error", err));

        adminRole.save()
          .then(() => console.log("added 'admin' to roles collection"))
          .catch(err => console.log("error", err));
      }
    })
    .catch(err => {
      console.log("Error checking role count:", err);
    });
}
