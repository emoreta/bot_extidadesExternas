import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
const Supa = async (cedula) => {
    console.log("Processing Supa");
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let wellAdded = [];
    let processed = [];
    let error = [];
    console.log(`Reading page`);
    await page.goto(`http://supa.funcionjudicial.gob.ec/pensiones/publico/consulta.jsf`);
    //await page.waitForSelector('input[name=t_texto_cedula]');
    //await page.$eval('input[name=t_texto_cedula]', el => el.value = '1718921362')
    await page.waitForSelector('#form\\:t_texto_cedula');
    await page.type('#form\\:t_texto_cedula',cedula);
    await page.click('#form\\:b_buscar_cedula > span');
    await delay(4000);
    await page.waitForSelector('#form\\:j_idt57 > div.ui-datatable-tablewrapper > table').then(() => console.log('got it'));
      /*const data1 = await page.evaluate(() => {
        const tableBody = document.querySelectorAll('#form\\:j_idt57 > div.ui-datatable-tablewrapper > table');
        return Array.from(tableBody).map(element => element.innerText);
    });
    console.log(data1);*/
      const table = await page.$('#form\\:j_idt57 > div.ui-datatable-tablewrapper > table');
      const html = await page.evaluate(tbody => tbody.innerHTML, table);
      //const tableLength = await page.$$eval(`${table} > td`, el => el.length
      console.log(html);
      
      /*const data = await page.evaluate(() => {
        const dataObject = {};
        const tbody = document.querySelector('#form\\:j_idt57 > div.ui-datatable-tablewrapper > table');
        
        for (const row of tbody.rows) {
            
            console.log(row);

          if (!row.querySelector('td')) continue; // Skip headers.
  
          const [keyCell, valueCell] = row.cells;
          dataObject[keyCell.innerText] = valueCell.innerText;
        }
        return dataObject;
      });*/
      //console.log(data);

      fs.mkdir(path.join(process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL,cedula), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

      await page.screenshot({
        path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL+cedula+'/'+cedula+'_SP.png',
        fullPage: true
      })

      await page.pdf({ path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL+cedula+'/'+cedula+'_SP.pdf' });
      await browser.close();

      return {'state':'OK','path':process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL+cedula+'/'+cedula+'_SP.png'};  
}
export default Supa;
   

