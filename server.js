const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = require('express')();
const db = require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PASSPORT
app.use(cookieSession({
  maxAge: 12 * 60 * 60 * 1000, // expires in 12 hours
  keys: ['123809u18hsadfghukjgrui2rghasjkasdf23']
}));
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

// ROUTES
app.get('/', (req, res) => {
  res.send("Yes! I'm listening");
});
require('./routes/users')(app);
require('./routes/accounts')(app);
require('./routes/products')(app);
require('./routes/plates')(app);
require('./routes/orders')(app);


app.listen(3000, () => {
  console.log('server is running on 3000');
});
