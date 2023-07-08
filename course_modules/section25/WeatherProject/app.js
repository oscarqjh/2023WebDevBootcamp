import express, { json } from "express";
import https from "https";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res) {
    const query = req.body.cityName;
    const key = "f569099b85bdba553cf3cfd4132ffc3d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+unit;
    
    https.get(url, function(response) {

        response.on("data", function(data) {
            const weather = JSON.parse(data);
            const desc = weather.weather[0].description;
            const temp = weather.main.temp;
            const icon = "https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png";
            res.write(`<p>The weather now is ${desc}</p>`);
            res.write(`<img src="${icon}">`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius</h1>`);
            res.send();
        });
    })
})

app.listen(3000, function() {
    console.log("The server is running on port 3000");
})