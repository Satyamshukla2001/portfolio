require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Project = require('../models/Project');
const projects = require('./projects');

(async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects`);
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
