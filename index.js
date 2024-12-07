const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/html', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

app.get('/text',(req,res)=> {
    const filePath = path.join(__dirname, 'file.txt');
    fs.readFile(filePath, 'utf8', (err, data)=> {
        if(err) {
            res.status(500).send('File reading error');
        } else {
            res.send(data);
        }
    });
});

app.get('/',(req,res) => {
    const {name, value} = req.query;
    if(name && value) {
        const dataToWrite = `${name}=${value}\n`;
        fs.appendFile('file.txt',dataToWrite,(err)=> {
            if(err) {
                res.status(500).send('Error writing to the file');
            } else {
                res.send('The data ${name}=${value} has been successfully written to the file');
            }
        });
    } else {
        res.send('The name and value parameters must be passed');
    }
});
app.listen(port,()=> {
    console.log(`The server is running on http://localhost:${port}`);
})