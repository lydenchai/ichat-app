// list of users for login.
let users = [
    { name: "Lyden", password: "lyden009" },
    { name: "Lyheang", password: "lyheang0010" },
];
  
//Create a server.
const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT);
// login request path
app.use("/login", (req, res) => {
    //get the username and password from the query of the request.
    let name = req.query.name;
    let password = req.query.password;
    let invalid  = false;
  
    //Check user and password if valid return true otherwise return false. 
    for (user of users){
      if (name === user.name && password === user.password){
        invalid = true
      }
    }
    res.send(invalid);
});
  app.use(express.static("front_end"));