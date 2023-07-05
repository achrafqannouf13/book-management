const express = require('express');
const connectToDatabase = require('./db');
const router = require('./routes');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

// Configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/api', router);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données MongoDB', error);
  });
