const express = require('express');
const db = require('./config/db');
const User = require('./models/User');
const Role = require('./models/Role');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');

const cors = require('cors');
const routes = require('./routes/routes');
const https = require('https');
const fs = require('fs');
const app = express();

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });
User.belongsTo(Role);

const port = 3000;

db.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


app.use(cors());
// Express middleware
app.use(express.json());

// Use the routes middleware
app.use(routes);



app.listen(port, () => {
  console.log(`Performance Dashboard started on port ${port}`);
});