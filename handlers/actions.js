const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.includes('/cats/details/') && req.method === 'GET') {

        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/editCat.html'));

        const id = Number(pathname.split('/').pop());

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File not found.');
                res.end();
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            const breedOptions = breeds.map(breed => {
                return `<option value="${breed}">${breed}</option>`
            });


            const modifiedData = data.toString()
                .replace('{{catBreeds}}', breedOptions)
                .replace('{{catName}}', cats[id].name)
                .replace('{{catDescription}}', cats[id].description)
                .replace('{{catUpload}}', cats[id].upload);


            res.write(modifiedData);
            res.end();
        });

    } else {
        return true
    }
}