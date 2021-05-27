const url = "http://192.168.88.17:3000";

function show_message(message_data) {
    message_container.firstElementChild.remove();
    let smallBody = document.createElement("div");
    smallBody.className = "smallBody";
    for (let data of message_data) {
        let userA = document.createElement("div");
        userA.className = "userA";
        userA.id = "userA";
        let userB = document.createElement("div");
        userB.className = "userB";
        let label = document.createElement("label");
        let p = document.createElement("p");
        if (data.name === username_login) {
            label.textContent = username_login;
            p.textContent = data.text;
            userA.appendChild(label);
            userA.appendChild(p);
            smallBody.appendChild(userA);
        } else {
            label.textContent = data.name;
            p.textContent = data.text;
            userB.appendChild(label);
            userB.appendChild(p);
            smallBody.appendChild(userB);
        }

        // text bold

        // if (data.textBold === true){
        //     p.style.fontWeight = "bold";
        // }else{
        //     p.style.fontWeight = "normal";
        // }
        // if (data.textItalic === true){
        //     p.style.fontStyle = "italic";
        // }else{
        //     p.style.fontStyle = "normal";
        // }
    }
    message_container.appendChild(smallBody);
};

function loard_message() {
    axios.get("/getmessage").then((response) => {
        show_message(response.data);
    });
};

function send_message() {
    let message_info = {
        username: username_login,
        text: message_text.value,
    };
    axios.post(url + "/post", message_info);
};

// TEXT BOLD-----------

let fontBold = false;
let count = 0;
function textBold(){
    count++;
    if (count %2 !== 0){
        fontBold = true;
        message_text.style.fontWeight = "bold";
    }else{
        fontBold = false;
        message_text.style.fontWeight = "normal";
    }
}

//  TEXT ITALIC----------

let textItalic = false;
let check = 0;
function fontItalic(){
    check++;
    if (check %2 !== 0){
        textItalic = true;
        message_text.style.fontStyle = "italic";
    }else{
        textItalic = false;
        message_text.style.fontStyle = "normal";
    }
}

//Main information 
let message_container = document.querySelector(".message_container")
let username_login = localStorage.getItem("username");
let password = localStorage.getItem("password");
let message_text = document.querySelector(".word");
let btn_send = document.getElementById("send");

btn_send.addEventListener("click", send_message);
let btnBold = document.querySelector("#btnBold");
btnBold.addEventListener("click", textBold);
let btnItalic = document.querySelector("#btnItalic");
btnItalic.addEventListener("click", fontItalic);

// Refresh
setInterval(loard_message, 100);

// BOLD







// Log out
function signout() {
    window.location.href = "../index.html";
}
let logOut = document.querySelector("#logOut");
logOut.addEventListener("click", signout);

