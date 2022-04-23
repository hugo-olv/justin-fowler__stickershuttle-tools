const fs = require('fs');
const axios = require('axios')

const getUrl = (width, height, qty) => {
    // sha256Hash is expirable. So we need get a new one from the stickermule site.
    const sha256Hash = "ba9151de7c822f6796eb8566b487be83826e8e8195396003436f25d865972f21"
    return `https://www.stickermule.com/bridge/graphql?operationName=PRODUCT_PRICE&variables={"productId":"317","locale":"en","size":{"width":${width},"height":${height}},"quantity":${qty},"currency":"USD"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"${sha256Hash}"}}`
}

const fetchUrl = async (url) => {
    try {
        const result = await axios.get(url)
        return result.data
    } catch (error) {
        console.error('Error message', error.message)
    }
}

const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const getResult = async () => {
    const qty = 10
    let counter = 1;
    let result = {}

    for (let i = 1; i <= 20; i++) {

        for (let b = 1; b <= 20; b++) {
            let key = `${i}x${b}`

            const url = getUrl(i, b, qty)
            const fetchResult = await fetchUrl(url)
            console.log(fetchResult.data.productPrice)
            result[key] = {
                pos: counter,
                pu: (parseInt(fetchResult.data.productPrice)) / qty
            }
            await wait(100)
            counter++
        }
    }

    return result
}

getResult().then(result => {
    fs.writeFileSync('out/stickermule-price.json', JSON.stringify(result), (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.")
            throw err
        }

        console.log("JSON file has been saved.")
    })
})

