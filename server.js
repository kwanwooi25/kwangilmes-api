const bodyParser = require('body-parser');
const cors = require('cors');

const app = require('express')();
const db = require('./database');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
  res.send("Yes! I'm listening");
});
require('./routes/auth')(app);
require('./routes/users')(app);
require('./routes/accounts')(app);
require('./routes/products')(app);
require('./routes/plates')(app);
require('./routes/orders')(app);


app.listen(3000, () => {
  console.log('server is running on 3000');
});
