const app = require('./app');
require('./database/index');

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
