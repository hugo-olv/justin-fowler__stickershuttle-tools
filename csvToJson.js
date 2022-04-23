const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('products_export_1x1-5x20.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
