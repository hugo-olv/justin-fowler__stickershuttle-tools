const STICKERMULE_PRICE = require('../out/stickermule-price.json')

const CONFIG = {
    // Common options for all products.
    // These options will be added by default to all products.
    // Can be overwritten independently in the @productOptions field of each products.
    commonProductsOptions: {
        'Vendor': 'StickerShuttle',
        'Custom Product Type': 'config',
        'Tags': 'custom-config',
        'Published': 'true',
        'Option1 Name': 'Size',
        'Gift Card': 'false',
        'Status': 'active'
    },
    // Common options for all variants of all products. 
    // These options will be added by default to all variants.
    // Can be overwritten independently in the @variantOptions field of each products.
    commonVariantsOptions: {
        'Variant Inventory Qty': '0',
        'Variant Inventory Policy': 'deny',
        'Variant Fulfillment Service': 'manual',
        'Variant Requires Shipping': 'true',
        'Variant Taxable': 'true',
        'Variant Grams': '0.0',
        'Variant Weight Unit': 'lb',
        'Cost per item': '0.10',
    },
    // Each block {} below products represent a product to be generated in the final CSV.
    products: [
        /* 
         * @title - Required. The title of the product for Shopify. Strings.
         * @handleBase - Required. The base handle of the product for Shopify. Strings.
         * 
         * @unitPrice - Optional. A price for 1 in². Number.
         * @stickermulePrices - Optional. A list of prices scrapped from Stickermule. Object.
         * 
         * You can set either @unitPrice or @stickermulePrices (you must define one). If you set both, the @unitPrice will be used. 
         * The prices from stickermule are already imported to this file. If you want a product to use these prices,
         * just set the following field => stickermulePrices: STICKERMULE_PRICE inside the product {}.
         * Don't forget to remove or comment the @unitPrice field if using stickermule prices.
         * /!\ Be carefull that your @sizeRange values don't overlap those from the strickermule-price.json file.
         *     The stickermule-price.json file range from '1x1' to '20x20' by default. 
         *     For example, you can't set @sizeRange: ['1x1', '30x30'] with a stickermule-price.json ranging from '1x1' to '20x20'.
         *     The final product will lack the prices from '20x20' to '30x30'.
         * 
         * @sizeRange - Required. Size variants from Min to Max for the product (in X in). Eg: ['1x1', '20x20']. Array of 2 strings.
         * @productOptions - Optional. Options for the product. Eg: { 'Vendor': 'Stickermule', 'Tags': 'custom-config' }. Object.
         * @variantsOptions - Optional. Options for each variant. Eg: { 'Variant Inventory Qty': '0', 'Variant SKU': 'SKU123', }. Object.
         */
        {
            title: 'Custom Die-Cut Stickers',
            handleBase: 'custom-die-cut-stickers',
            // unitPrice: 1.60,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                /* All optional product fields goes here. Default values will be overwritten. 
                 * Eg: If you put 'Option1 Name': 'Weight' you will overwrite default = 'Option1 Name': 'Size' from commonProductsOptions
                 * for this product.
                 * See template.js file to see all the fields you can write.
                 */
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/products/DieCut.png?v=1650732284',
                'Image Position': '1',
                'Image Alt Text': 'custom die-cut stickers',
            },
            variantsOptions: {
                /* All optional variants fields goes here. Default values will be overwritten. 
                 * Eg: If you put 'Variant Inventory Qty': '100' you will overwrite default = 'Variant Inventory Qty': '0' from commonVariantsOptions
                 * for this product.
                 * See template.js file to see all the fields you can write.
                 */
                'Variant SKU': 'SKU123',
            },
        },
        {
            title: 'Custom Circle/Oval Stickers',
            handleBase: 'custom-circle-oval-stickers',
            // unitPrice: 1.15,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/Circle_c1071b32-0487-496c-abde-3358b11a1d21.png?v=1649343985',
                'Image Position': '1',
                'Image Alt Text': 'custom circle/oval stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU456',
            }
        },
        {
            title: 'Custom Square Stickers',
            handleBase: 'custom-square-stickers',
            // unitPrice: 1.25,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/Square.png?v=1649344004',
                'Image Position': '1',
                'Image Alt Text': 'custom square stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU1045',
            }
        },
        {
            title: 'Custom Rectangle Stickers',
            handleBase: 'custom-rectangle-stickers',
            // unitPrice: 2.00,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/Rectangle.png?v=1649344165',
                'Image Position': '1',
                'Image Alt Text': 'custom rectangle stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU895',
            }
        },
        {
            title: 'Custom Bumper Stickers',
            handleBase: 'custom-bumper-stickers',
            // unitPrice: 0.75,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/Bumper-Sticker_62405fcf-17d9-4f2e-a76a-157615976a16.png?v=1649345058',
                'Image Position': '1',
                'Image Alt Text': 'custom bumper stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU555',
            }
        },
        {
            title: 'Custom Static Cling Stickers',
            handleBase: 'custom-static-cling-stickers',
            // unitPrice: 0.60,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/static-cling.png?v=1649344936',
                'Image Position': '1',
                'Image Alt Text': 'custom static cling stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU888',
            }
        },
        {
            title: 'Custom Clear Stickers',
            handleBase: 'custom-clear-stickers',
            // unitPrice: 0.50,
            stickermulePrices: STICKERMULE_PRICE,
            sizeRange: ['1x1', '20x20'],
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/clear.png?v=1649344951',
                'Image Position': '1',
                'Image Alt Text': 'custom clear stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU960',
            }
        },
    ],
}

module.exports = {
    CONFIG
}
