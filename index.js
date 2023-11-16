const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const webpush = require('web-push');
const app = express();
const puppeteer = require('puppeteer');
require('dotenv').config();
let url;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = process.env.VAPID_PUBLIC;
const privateVapidKey = process.env.VAPID_PRIVATE;
webpush.setVapidDetails('mailto:gohilsuryadeep3101@gmail.com', publicVapidKey,privateVapidKey);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
})

app.post('/subscribe', (req, res)=>{
            let score, score2, result;
            try {
                scrape(url).then((r) => {
                    score = r[0]; //score of current batting team
                    result = r[1];
                    score2 = r[2]; // score of other team
                    const subscription = req.body;
                    // Send status 201 for the request
                    res.status(201).json({});
                    // Create payload: specify the details of the push notification
                    const payload = JSON.stringify({ title: "Current Score: " , batTeam: score, bowTeam: score2, condition: result});
            
                    // Pass the object into the sendNotification function and catch any error
                    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
                });
        
                
            } catch (err) {
                // Handle the error, e.g., send a response to the client
                console.error(err);
                res.status(400).json({ error: 'Invalid URL' });
            }
    }
)
app.post('/', (req, res)=>{
    url = req.body.string;
    res.redirect('/');
})



const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});

async function scrape(url){
    //opening browser and page
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto(url, {waitUntil: 'load',timeout: 0});

    //scraping text 
    const [el] = await page.$x('/html/body/div[1]/div[2]/div[4]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/h2');
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    const [el2] = await page.$x('//*[@id="matchCenter"]/div[3]/div[2]/div[2]/div[2]');
    const result = await el2.getProperty('textContent');
    const rawResult = await result.jsonValue();

    const [el3] = await page.$x('/html/body/div[1]/div[2]/div[4]/div[3]/div[2]/div[1]/div[1]/div[1]/h2');
    const txt2 = await el3.getProperty('textContent');
    const rawTxt2 = await txt2.jsonValue();
    
    browser.close();
    return [rawTxt, rawResult, rawTxt2];
};
