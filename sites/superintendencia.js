import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import tesseract from "node-tesseract-ocr";


const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
const Superintendencia = async (cedula) => {
    console.log("Processing Supa");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let wellAdded = [];
    let processed = [];
    let error = [];


    console.log(`Reading page`);
    await page.goto(`https://appweb.superbancos.gob.ec/ssl/registro/registro.jsf`);
    await page.waitForSelector('#LB');
    await page.waitForSelector('#cerrar');
    await page.waitForSelector('#cerrar');
    await delay(300);
    await page.click('#cerrar');
    await page.click('#cerrar');
    await page.click('#cerrar');

    await page.evaluate(() => {

        $("#cerrar").click(function () {
            $("#fndLB").fadeOut();
            $("#LB").fadeOut("slow");
            $("#cerrar").fadeOut("slow");
        });

    });
    await delay(4000);
    //const navigationPromise = page.waitForNavigation();
    await page.waitForSelector('#frmConsulta\\:frmUsuario\\:tipoIden\\:socc');
    //await page.select('#frmConsulta\\:frmUsuario\\:tipoIden\\:socc', 'C');
    const combo = await page.waitForXPath('//*[@id="frmConsulta:frmUsuario:tipoIden:socc"]');
    //await Promise.all([combo.evaluate(cb => cb.click()), page.waitForNavigation()]);
    combo.evaluate(cb => cb.click());
    page.select('#frmConsulta\\:frmUsuario\\:tipoIden\\:socc', 'C');
    //navigationPromise;

    await delay(2000);





    //await delay(300);
    /*await page.keyboard.press("Enter");*/
    //await page.keyboard.press("Tab");
    //await page.keyboard.press("Tab");
    //await page.click('#frmConsulta\\:frmUsuario\\:nIden\\:itcc');


    //const navigationPromiseCedula = page.waitForNavigation();
    await page.waitForSelector('#frmConsulta\\:frmUsuario\\:nIden\\:itcc');
    await page.type('#frmConsulta\\:frmUsuario\\:nIden\\:itcc', '1718921362');
    //navigationPromiseCedula;

    /*const txtIdentificacion = await page.waitForXPath('//*[@id="frmConsulta:frmUsuario:nIden:itcc"]');
    await txtIdentificacion.evaluate(cb => cb.value,'1718921362');*/



    await page.waitForSelector('#frmConsulta\\:frmUsuario\\:fCedInputDate');
    /*//await page.type('#frmConsulta\\:frmUsuario\\:fCedInputDate','01/01/2023');
    await page.fill("#frmConsulta\\:frmUsuario\\:fCedInputDate", "01/01/2023");*/
    await page.$eval('#frmConsulta\\:frmUsuario\\:fCedInputDate', e => e.setAttribute("value", "03/04/2023"))

    const navigationPromiseEmail = page.waitForNavigation();
    await page.waitForSelector('#frmConsulta\\:frmUsuario\\:nCorreo\\:itcc');
    await page.type('#frmConsulta\\:frmUsuario\\:nCorreo\\:itcc', 'edixavi@hotmail.com');
    navigationPromiseEmail;






    //document.querySelector("#frmConsulta\\:frmUsuario\\:j_idt59")


    /*await page.evaluate(() => {
       document.querySelector("#frmConsulta\\:frmUsuario\\:cond\\:itcc").parentElement.click();
     });*/
    //await delay(10000);
    //await page.waitForNavigation();


    //await page.waitForSelector('#frmConsulta\:frmUsuario\:btnGuardar');

    /*console.log(
        page.querySelector('[id="#frmConsulta\:frmUsuario\:btnGuardar"] ')
      );*/
    //await page.waitFor('//*[@id="frmConsulta:frmUsuario:btnGuardar"]')


    const element = await page.$('#frmConsulta\\:frmUsuario\\:j_idt59');
    await element.screenshot({ path: 'captcha1.png' });


    //const imgs = await page.$$eval('#frmConsulta\\:frmUsuario\\:j_idt59', imgs => imgs.map(img => img.getAttribute('src')));

    //console.log(imgs);

    try {
        const text = await tesseract.recognize("captcha1.png", config)
        console.log("Result:", text)
        //await page.waitForSelector('#frmConsulta\\:frmUsuario\\:cap\\:itcc');
        let input = await page.waitForSelector('#frmConsulta\\:frmUsuario\\:cap\\:itcc');
        page.click("#frmConsulta\\:frmUsuario\\:cap\\:itcc");
        await delay(1000);
        await input.type(text);
        //await delay(1000);
        await page.keyboard.press("Enter");


        //await delay(3000);
        //await page.click("#frmConsulta\\:frmUsuario\\:cap\\:itcc");
        //await delay(1000);
        //await page.type('#frmConsulta\\:frmUsuario\\:cap\\:itcc', text);
    } catch (error) {
        console.log(error.message)
    }

    await page.waitForSelector('#frmConsulta\\:frmUsuario\\:cond\\:itcc');
    await page.$eval('#frmConsulta\\:frmUsuario\\:cond\\:itcc', check => check.checked = true);


    const aceptar = await page.waitForXPath('//*[@id="frmConsulta:frmUsuario:btnGuardar"]');

    const navigationPromiseAceptar = page.waitForNavigation();
    aceptar.evaluate(el => el.click());
    navigationPromiseAceptar;

    /*try {
        const element1 = await page.$('#frmConsulta\\:frmUsuario\\:j_idt59');
        await element1.screenshot({ path: 'captcha2.png' });
        const text = await tesseract.recognize("captcha2.png", config)
        console.log("Result:", text)
        let input = await page.waitForSelector('#frmConsulta\\:frmUsuario\\:cap\\:itcc');
        page.click("#frmConsulta\\:frmUsuario\\:cap\\:itcc");
        await input.click({ clickCount: 3 });
        await input.press('Backspace');
        await delay(1000);
        await input.type(text);

    } catch (error) {
        console.log(error.message)
    }
    const navigationPromiseAceptar1 = page.waitForNavigation();
    aceptar.evaluate(el => el.click());
    navigationPromiseAceptar1;*/


    //page.waitForNavigation()
    //]);

    //await page.click('//*[@id="frmConsulta:frmUsuario:btnGuardar"]');
    /*page.$eval('#frmConsulta\:frmUsuario\:btnGuardar', element =>
        element.click()
    );*/
    /*await Promise.all([
        page.$eval(`#frmConsulta\:frmUsuario\:btnGuardar`, element =>
          element.click()
        ),
        await page.waitForNavigation(),
      ]);*/
||

    //await delay(2000);


    //await page.waitForNavigation();





}
export default Superintendencia;