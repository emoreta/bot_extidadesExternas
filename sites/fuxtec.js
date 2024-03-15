const puppeteer = require('puppeteer');
const fs = require('fs');
module.exports.Fuxtec = async () => {
    console.log("Processing fuxtec");
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let wellAdded = [];
    let processed = [];
    let error = [];
    for(let i=1; i<=86; i++){
        console.log(`Reading page ${i}`)
        await page.goto(`https://www.fuxtec.de/zubehoer-ersatzteile?p=${i}`);
        await page.waitForSelector('.cms-element-product-listing');

        let products = await page.$$eval('.cms-element-product-listing .product-info', links => {
            links = links.map(el => el.querySelector('a').href)
            return links;
        });

        for(const product in products){
            const url = products[product];
            await page.goto(url);
            await page.waitForSelector('.product-detail-form-container');
            const  form = await page.$('#productDetailPageBuyProductForm');
            try{
                await form.$eval('button', el => el.click());
                await page.waitForSelector('.offcanvas-cart');
                const  items = await page.$('.offcanvas-cart-items');
                const  quantity = await items.$eval('.cart-item-quantity-container input[name="quantity"]', el=>el.value);
                if(quantity!=='1'){
                    processed.push({
                        "product": url,
                        "quantity": quantity
                    });
                }
                else{
                    wellAdded.push({
                        "product": url,
                        "quantity": quantity
                    });
                }
                await items.$eval('.cart-item-remove-button', el => el.click());
            }
            catch (e){
                error.push({
                    "product": url,
                    "error": e
                });
            }
        }
        fs.writeFile(`./wellAdded${i}.txt`,JSON.stringify(wellAdded),()=>{
            return true;
        });
        fs.writeFile(`./processed${i}.txt`,JSON.stringify(processed),()=>{
            return true;
        });
        fs.writeFile(`./error${i}.txt`,JSON.stringify(error),()=>{
            return true;
        });
    }
    console.log("DOne!!!");

}

