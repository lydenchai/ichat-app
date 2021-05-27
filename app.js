// list of users for login.
const fs = require("fs");
let data_user = JSON.parse(fs.readFileSync("data.json"));

//Create a server.

const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log("server is running.."));
app.use(express.json());

let message_data = JSON.parse(fs.readFileSync("chat.json"));
// GET DATA
app.get("/getmessage", (req, res) => {
    res.send(message_data);
})

// MESSAGE DATA
app.post("/post", (req, res) => {
    let userName = req.body.username;
    let txt_chat = req.body.text;
    let info = {
        name: userName,
        text: txt_chat,
    }
    message_data.push(info);
    fs.writeFileSync("chat.json", JSON.stringify(message_data));
    res.send(info);
})

// Login

app.use(express.static("front_end"));
app.post("/login", (req, res) => {
    let getInfo = req.body;
    let check = false
    for (let user of data_user) {
        if (user.name === getInfo.name && user.password === getInfo.password) {
            check = true;
        }
    }
    res.send(check);
});