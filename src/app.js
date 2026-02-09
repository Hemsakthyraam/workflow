const express = require('express');
const app = express();
const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/teams', teamRoutes);
app.use('/projects',projectRoutes);
app.use('/tasks', taskRoutes);
app.use(require('./middlewares/errorHandler'));
app.use('/users', require('./routes/userRoutes'));


module.exports = app;