/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
    .prompt([
        {
            name: 'user_answer',
            message: 'Which website\'s QR code do you want?',
            type: 'list',
            choices: ["Google", "Yahoo", "Bing", "Others"]
        }
    ])
    .then((answers) => {
        var url = "https://www.google.com";
        switch (answers.user_answer) {
            case "Google":
                url = "https://www.google.com";
                break;
            case "Yahoo":
                url = "https://sg.yahoo.com";
                break;
            case "Bing":
                url = "https://www.bing.com/";
                break;
            case "Others":
                inquirer
                    .prompt([
                        {
                            name: "input_url",
                            message: "Enter the URL: ",
                            type: 'input',
                        }
                    ])
                    .then((answers) => {
                        url = answers.input_url;
                        fs.writeFile("URL.txt", url, (err) => {
                            if (err) throw err;
                        });
                
                        var qr_png = qr.image(url, { type: 'png', parse_url: 'false' });
                        qr_png.pipe(fs.createWriteStream('qr.png'));
                    })
                    .catch((error) => {
                        if (error.isTtyError) {
                        // Prompt couldn't be rendered in the current environment
                        } else {
                        // Something else went wrong
                        }
                    });
        }

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
        });

        var qr_png = qr.image(url, { type: 'png', parse_url: 'false' });
        qr_png.pipe(fs.createWriteStream('qr.png'));
        
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log("Error100");
        } else {
            // Something else went wrong
            console.log("Error200");
        }
});


