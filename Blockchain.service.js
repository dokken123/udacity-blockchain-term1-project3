const express = require('express');

const Blockchain = require("./Blockchain")

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

var blockchain = new Blockchain((height) => {
    console.log("Blockchain initiated with height: " + height);
});

app.get("/", (req, res) => {
    blockchain = new Blockchain((height) => {
        console.log("Blockchain initiated with height: " + height);
        res.send({'Application': 'Blockchain local API', 'ver': 1.0, 'BlockHeight': height});
    });
});

app.post("/block", (req,res) => {
    var block = req.body;
    blockchain.addBlock(block, (retBlock) => {
        res.send(retBlock);
    }, (err) => {
        res.send(err);
    });
});

app.get("/block/:height", (req,res) => {
    var height = req.params.height;
    blockchain.getBlock(height, (block) => {
        res.send(block);
    }, (err) => {
        res.send(err);
    });
});

module.exports = app;