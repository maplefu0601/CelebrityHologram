const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const items = require('../controllers/items');

// controllers
const Authentication = require('../controllers/authentication');
// services
const passport = require('passport');
require('../services/passport.js');

// session false as we are not using cookies, using tokens
const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, items.getItems);
router.post('/', jsonParser, items.createItem);
router.get('/item/:id', items.findItem);
router.get('/:name', items.findItemByName);
router.delete('/:id', items.deleteItem);

module.exports = router;
