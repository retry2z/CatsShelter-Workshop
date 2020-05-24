const homeHandler = require('./home');
const staticFiles = require('./static-files');
const cats = require('./cats');
const actions = require('./actions');


module.exports = [homeHandler, cats, actions, staticFiles];
