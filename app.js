require('dotenv').config();
const knex = require('knex');
const { attachOnExitListener } = require('./utils/dbUtils');
const express = require('express');
const app = express();
const recruitmentRoutes = require('./modules/recruitment/routes/recruitmentRoutes');
const employeeManagementRoutes = require('./modules/employee-management/routes/employeeManagementRoutes');
const learningAndDevelopmentRoutes = require('./modules/learning-and-development/routes/learningAndDevelopmentRoutes');
const timeAndAttendanceRoutes = require('./modules/time-and-attendance/routes/TimeAndAttendanceRoutes');

const knexConfig = {
  client: 'pg',
  connection: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false },
  pool: { min: 2, max: 20 },
  acquireConnectionTimeout: 10000
};

const db = knex(knexConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('db', db);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

attachOnExitListener(db);

app.use('/recruitment', recruitmentRoutes);
app.use('/employee-management', employeeManagementRoutes);
app.use('/learning-and-development', learningAndDevelopmentRoutes);
app.use('/time-and-attendance', timeAndAttendanceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SIRH Project is running on port ${PORT}`);
});
