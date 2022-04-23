const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { TEMPLATE } = require('./utils/template.js')
const { CONFIG } = require('./utils/config.js')

const getData = () => {
    let result = []

    const getPricePerInSquare = (width, height, unitPrice) => {
        return parseFloat((width * height) * unitPrice).toFixed(2)
    }

    CONFIG.products.forEach(({ title, handleBase, unitPrice, stickermulePrices, sizeRange, productOptions, variantsOptions }) => {
        console.log(`--------------- ${title} ---------------`)
        let counter = 1
        let keyIdx = 0

        // ['iStart x bStart', 'iEnd x bEnd']
        const iStart = parseInt(sizeRange[0].split('x')[0])
        const iEnd = parseInt(sizeRange[1].split('x')[0])
        const bStart = parseInt(sizeRange[0].split('x')[1])
        const bEnd = parseInt(sizeRange[1].split('x')[1])

        // const totalIteration = (iEnd - iStart) * (bEnd - bStart)

        const getKeys = () => {
            let keyCounter = 1
            let from
            let to
            let keys = []

            for (let i = iStart; i <= iEnd; i++) {
                for (let b = bStart; b <= bEnd; b++) {
                    if (keyCounter === 1) from = `${i}x${b}`
                    if (keyCounter === 100) {
                        to = `${i}x${b}`
                        keys.push({ from, to })
                        keyCounter = 1
                    }
                    else keyCounter++
                }
            }

            return keys
        }

        const keys = getKeys()

        for (let i = iStart; i <= iEnd; i++) {

            for (let b = bStart; b <= bEnd; b++) {
                const value = `${i}x${b}`
                const price = unitPrice ? getPricePerInSquare(i, b, unitPrice) : stickermulePrices[value].pu
                const handle = `${handleBase}-${keys[keyIdx].from}-${keys[keyIdx].to}`

                const variant = {
                    ...TEMPLATE,
                    Handle: handle,
                    'Option1 Value': value,
                    'Variant Price': price,
                    ...CONFIG.commonVariantsOptions,
                    ...variantsOptions
                }

                // First line of the csv file. Data for the product and the first variant.
                if (counter === 1) {
                    const product = {
                        ...variant,
                        Title: title,
                        ...CONFIG.commonProductsOptions,
                        ...productOptions,
                    }

                    result.push(product)
                }
                // Others line of the file. Data for the other variants.
                else {
                    result.push(variant)
                }
                // If counter === 100, it means we have 100 variants line for this product. We start a new product by setting counter to 1.
                if (counter === 100) {
                    counter = 1
                    keyIdx++
                    console.log(`"${handle}",`)
                }
                else counter++

            }
        }

    })

    return result
}

const data = getData()

const csvWriter = createCsvWriter({
    path: `out/products.csv`,
    header: [...Object.entries(TEMPLATE).map(([key]) => ({ id: key, title: key }))]
});

csvWriter
    .writeRecords(data)
    .then(() =>
        console.log(`
    The CSV file products.csv was written successfully to the out directory. You can now import it to shopify.
    Copy and paste the above products handles to their respective products in product-calculator-config.js
        `));