const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
// const cats = require('../data/cats.json');
// const breeds = require('../data/breeds.json');

const getHandler = (res, req, view) => {
    const filePath = path.normalize(
        path.join(__dirname, `../views/cats/${view}.html`));

    fs.readFile(filePath, 'utf-8', (err, data) => {
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
}


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    //BREED
    if (pathname === '/cats/addBreed' && req.method === 'GET') {
        getHandler(res, req, 'addBreed');
    } else if (pathname === '/cats/addBreed' && req.method === 'POST') {


        let body = '';
        req.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            const post = qs.parse(body);
            const filePath = path.normalize(
                path.join(__dirname, `../data/breeds.json`));


            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('File not found.');
                    res.end();
                    return
                }
                const breeds = JSON.parse(data);
                breeds.push(post.breed);

                console.log(breeds);
                fs.writeFileSync(filePath, JSON.stringify(breeds));
            });
        });
    }

    //CATS
    if (pathname === '/cats/addCat' && req.method === 'GET') {
        getHandler(res, req, 'addCat');
    } else if (pathname === '/cats/addBreed' && req.method === 'POST') {
        //
    }
}