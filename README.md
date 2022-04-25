# Tool for managing shopify products.
A node.js tool to manage shopify products that belong to the pricing calculator app.

This project include :
- A script to generate splitted products between a given size range.

## Introduction
Shopify have a limit of 100 variants per products. The pricing calculator use a workaround to bypass this limitation that consist of splitting the products
into several ones that share the variants among them.

For example, if you have a product with 400 variants for the size option. We will split it into 4 products containing 100 variants each. 
When a user select a size and click on add to cart, the calculator will automatically determine which product contain the variant that 
correspond to the requested size and add it to the cart.

This tools can be used to either create new products or update existing ones. 
You have the option to overwrite any current products that have the same handle when you import products from CSV in Shopify.
So, if you regenerate and re-import csv products by modifying some of their fields without touching their handles, you'll end up updating them.

This is very convenient because we have quite a few products for the calculator. Without this tool, update prices manually
for example would be a nightmare.

## Requirements
- Node.js

## Setup
Step 1: [Download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi) and install the LTS version of node.js on your computer.

Step 2: [Download](https://github.com/hugo-cdl/justin-fowler__stickershuttle-tools/archive/refs/heads/master.zip) and unzip this project on your computer.

Step 3: Locate the folder path of the project on your computer and copy it. For example, mine is : C:\dev\clients\justin-fowler\tools

![screenshot of foler path](https://i.ibb.co/LS8G2cD/screen-path.jpg)

Step 4: Open a terminal (start > then type command prompt on Windows) then write the following commands successively and hit enter :
```
cd [your project folder path]
```
You'll need to run this command each time you want to use the tool.
```
npm install
```
## Configuration
You'll find a config.js file located under a utils folder inside the project. This file is the only one you'll need to edit to generate your CSV products 
and is pretty well documented on its own.

This file represent an array of all the products you want to generate. Each product as some required and optional fields.

The most important field are set at the root of each product block {}.
```
@title, @handleBase, @sizeRange, @basePrice
```
The rest can be set in bulk inside @productOptions {} and @variantsOptions {} block and are optional.

The sizeRange will tell the script how many splitted products and their corresponding variants it has to generate.

If you want to add or remove a product, simply add or remove a block inside the @products field.

🚨 If you remove a product from the CSV generator, you will also need to manually remove it from Shopify.

Example of a product block :
```
        {
            title: 'Custom Circle/Oval Stickers',
            handleBase: 'custom-circle-oval-stickers',
            sizeRange: ['1x1', '20x20'],
            basePrice: (width, height) => {
                // f(x) = a * x
                const unitPrice = 0.10 
                const x = width * height 
                return (unitPrice * x)
            },
            productOptions: {
                'Image Src': 'https://cdn.shopify.com/s/files/1/0585/0546/1898/files/Circle_c1071b32-0487-496c-abde-3358b11a1d21.png?v=1649343985',
                'Image Position': '1',
                'Image Alt Text': 'custom circle/oval stickers',
            },
            variantsOptions: {
                'Variant SKU': 'SKU456',
            }
        },
```

To get an overview of all the fields you can set, see the template.js file which is located in the same utils folder.

I suggest you trying editing a shopify product and export it to csv, then open it with google sheet or excel to have a better understanding
of how the shopify csv product is structured, and which field you can set for your products.

When you're good with the config, you can run the command below to generate the csv.

## Usage
```
npm run generate
```
/!\ Your command line interface need to point to the project folder path. Type cd [your project folder path], then hit enter if needed.

Generate the products CSV file from the config.js values you've provide.
The result goes to the out folder inside the project under the name of products.csv. Once you've generated it, you can import it directly into Shopify.

A list of the splitted products handles will appear in the console once you have run the command. If you've adding or deleting some product 
or modified the @sizeRange you'll have to edit it accordingly inside the cut option under the pricing-calculator-config.js file under your 
theme code assets folder.
