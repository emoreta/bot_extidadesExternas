import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
//const fs = require('fs');
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
const FuncionJudicial = async (cedula) => {
    console.log("Processing Función Judicial");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let wellAdded = [];
    let processed = [];
    let error = [];

    console.log(`Reading page`);

    await page.goto(process.env.LINK_FUNCION_JUDICIAL);

    await page.waitForSelector('#form1\\:txtActorCedula');
    await page.type('#form1\\:txtActorCedula', cedula);
    await page.click('#form1\\:butBuscarJuicios');
    await page.waitForSelector('#form1\\:dataTableJuicios2_data > tr > td');//esperando a que aparezca el mensaje o la tabla
    await delay(3000);
    let txtActorCedula = await page.$('#form1\\:txtActorCedula');
    await txtActorCedula.click({ clickCount: 3 });
    await txtActorCedula.press('Backspace');

    fs.mkdir(path.join(process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL, cedula), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

    await page.screenshot({
        path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL + cedula + '/' + cedula + '_FJ_Actor.png',
        fullPage: true
    })

    await page.pdf({ path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL+cedula+'/'+cedula+'_FJ_Actor.pdf' });

    await page.waitForSelector('#form1\\:txtDemandadoCedula');
    await page.type('#form1\\:txtDemandadoCedula', cedula);
    await page.click('#form1\\:butBuscarJuicios');
    await page.waitForSelector('#form1\\:dataTableJuicios2_data > tr > td');//esperando a que aparezca el mensaje o la tabla
    await delay(3000);

    await page.screenshot({
        path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL + cedula + '/' + cedula + '_FJ_Demandado.png',
        fullPage: true
    })
    //solo funciona en modo oculto
    await page.pdf({ path: process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL+cedula+'/'+cedula+'_FJ_Demandado.pdf' });

    //------------------------------------------------


    /*await page.waitForSelector('#form1\\:txtDemandadoCedula');
    await page.type('#form1\\:txtDemandadoCedula',cedula);
    await page.click('#form1\\:butBuscarJuicios');
    await page.waitForSelector('#form1\\:dataTableJuicios2_data > tr > td');//esperando a que aparezca el mensaje o la tabla
    await delay(3000);*/
    await browser.close();

    return {
        'state': 'OK', 'Actor': process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL + cedula + '/' + cedula + '_FJ_Actor.png',
        'Demandado': process.env.ROUTE_DOCUMENTS_FUNCION_JUDICIAL + cedula + '/' + cedula + '_FJ_Demandado.png'
    };

}

export default FuncionJudicial;