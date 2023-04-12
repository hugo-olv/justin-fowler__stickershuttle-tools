const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { TEMPLATE } = require('./utils/template.js')
const { CONFIG } = require('./utils/stickerbull-config.js')

const getData = () => {
  let result = []

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2)
  }

  CONFIG.products.forEach(
    ({ title, handleBase, basePrice, sizeRange, productOptions, variantsOptions }) => {
      console.log(`--------------- ${title} ---------------`)
      let counter = 1
      let keyIdx = 0

      const iStart = parseInt(sizeRange[0].split('x')[0])
      const iEnd = parseInt(sizeRange[1].split('x')[0])
      const bStart = parseInt(sizeRange[0].split('x')[1])
      const bEnd = parseInt(sizeRange[1].split('x')[1])

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
            } else keyCounter++
          }
        }

        // Handle the last group with less than 100 variants
        if (keyCounter > 1) {
          to = `${iEnd}x${bEnd}`
          keys.push({ from, to })
        }

        return keys
      }

      const keys = getKeys()

      for (let i = iStart; i <= iEnd; i++) {
        for (let b = bStart; b <= bEnd; b++) {
          const value = `${i}x${b}`
          const price = basePrice ? formatPrice(basePrice(i, b)) : 0
          const handle = `${handleBase}-${keys[keyIdx].from}-${keys[keyIdx].to}`

          const variant = {
            ...TEMPLATE,
            Handle: handle,
            'Option1 Value': value,
            'Variant Price': price,
            ...CONFIG.defaultVariantsOptions,
            ...variantsOptions,
          }

          if (counter === 1) {
            const product = {
              ...variant,
              Title: title,
              ...CONFIG.defaultProductsOptions,
              ...productOptions,
            }

            result.push(product)
          } else {
            result.push(variant)
          }

          if (
            counter === 100 ||
            (keyIdx === keys.length - 1 && i === iEnd && b === bEnd)
          ) {
            counter = 1
            keyIdx++
            console.log(`"${handle}",`)
          } else counter++
        }
      }
    },
  )

  return result
}

const data = getData()

const csvWriter = createCsvWriter({
  path: `out/products.csv`,
  header: [...Object.entries(TEMPLATE).map(([key]) => ({ id: key, title: key }))],
})

csvWriter.writeRecords(data).then(() =>
  console.log(`
    The CSV file products.csv was written successfully to the out directory. You can now import it to shopify.
        `),
)
