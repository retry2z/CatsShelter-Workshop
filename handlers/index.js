const homeHandler = require('./home');
const staticFiles = require('./static-files');
const cats = require('./cats');
const edit = require('./edit');


module.exports = [homeHandler, cats, edit, staticFiles];
