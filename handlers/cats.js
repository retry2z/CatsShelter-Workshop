const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    //BREED
    if (pathname === '/cats/addBreed' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, `../views/cats/addBreed.html`));

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
                const tmp = JSON.parse(data);
                tmp.push(post.breed);

                fs.writeFileSync(filePath, JSON.stringify(tmp));
                res.writeHead(301, { "Location": "/" });
                return res.end();
            });
        });
    }

    //CATS
    if (pathname === '/cats/addCat' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, `../views/cats/addCat.html`));

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File not found.');
                res.end();
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            console.log(breeds);
            const breedOptions = breeds.map(breed => {
                return `<option value="${breed}">${breed}</option>`
            });

            console.log(breedOptions);
            const modifiedData = data.toString()
                .replace('{{catBreeds}}', breedOptions);

            res.write(modifiedData);
            res.end();
        });

    } else if (pathname === '/cats/addCat' && req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            const post = qs.parse(body);
            const filePath = path.normalize(
                path.join(__dirname, `../data/cats.json`));


            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('File not found.');
                    res.end();
                    return
                }
                const tmp = JSON.parse(data);
                console.log(post);
                tmp.push(
                    {
                        name: post.name,
                        description: post.description,
                        upload: post.upload,
                        breed: post.breed,
                    }
                );

                fs.writeFileSync(filePath, JSON.stringify(tmp));
                res.writeHead(301, { "Location": "/" });
                return res.end();
            });
        });
    }

}