const Papa = require('papaparse');
const fs = require('fs');
const csvFile = fs.readFileSync('/Users/emmaprice/Downloads/I Want Fries - Sheet1 (3).csv');
const csvData = csvFile.toString();

(async () => {
    const { data } = await Papa.parse(csvData, {header:true});
    console.log(data);
    let stores = [];
    let currentStore = {};
    for (let i = 0; i < data.length; i ++) {
        const row = data[i];
        if (row.Location === "") {
            currentStore.sizes.push({ size: row.Size, price: row.Price });
        }
        else {
            stores.push(currentStore);
            currentStore = row;
            currentStore.sizes = [{ size: row.Size, price: row.Price }];
            delete currentStore.Size;
            delete currentStore.Price;
        }

        if (i === data.length - 1) {
            stores.push(currentStore);
        }
    }
    stores.shift();

    const ratedStores = stores.filter(store => store.Thickness !== "");
    const unratedStores = stores.filter(store => store.Thickness === "");

    const file = { ratedStores, unratedStores };
    let jsonFile = JSON.stringify(file);
    fs.writeFileSync('./src/stores1.json', jsonFile);
})();