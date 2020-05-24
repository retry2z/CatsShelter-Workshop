const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');



module.exports = (req, res) => {
    const isProduct = url.parse(req.url).pathname.split('/')[1];
    const pathname = url.parse(req.url).pathname;
    if (isProduct === 'cats' && req.method === 'GET') {
        fs.readFile(`./views/${pathname}.html`, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File not found.');
                res.end();
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else {
        return true
    }
}