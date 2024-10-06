const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

const loadRoutes = (app) => {
  const microservicesDir = path.join(__dirname);
  fs.readdirSync(microservicesDir).forEach((folder) => {
    const routesPath = path.join(microservicesDir, folder, 'routes', 'index.js');
    if (fs.existsSync(routesPath)) {
      const routes = require(routesPath);
      app.use(`/api/${folder}`, routes);
    }
  });
};

loadRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('App SIRH fonctionne !');
});
