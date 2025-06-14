const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected!');
    
    app.listen(PORT, () => {
      console.log(`Server NOW running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();