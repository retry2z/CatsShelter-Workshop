const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    const catTemplate = (cat) => {
        const template =
            `<li><img src="${cat.upload}"><h3>${cat.name}</h3><p><span>Breed: </span>${cat.breed}</p><p><span>Description: </span>${cat.description}</p>
            <ul class="buttons"><li class="btn edit"><a href="/cats/details/${cat.id}">Details</a></li>
            <li class="btn delete"><a href="/cats/remove/${cat.id}">New Home</a></li></ul></li>`;
        return template
    };


    if (pathname === '/' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File not found.');
                res.end();
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            const catsData = cats.map(cat => {
                return catTemplate(cat);
            });
            const modifiedData = data.toString()
                .replace('{{cats}}', catsData);

            res.write(modifiedData);
            res.end(); res.end();
        });

    } else {
        return true
    }
}