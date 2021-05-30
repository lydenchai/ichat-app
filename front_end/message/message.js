const url = "http://192.168.88.14:3000";

let scrollAuto = true;
function show_message(message_data) {
    message_container.firstElementChild.remove();
    let smallBody = document.createElement("div");
    smallBody.className = "smallBody";
    for (let data of message_data) {
        // CREATE ELEMENTS----------
        let userA = document.createElement("div");
        userA.className = "userA";
        userA.id = "userA";
        let userB = document.createElement("div");
        userB.className = "userB";
        let label = document.createElement("label");
        let p = document.createElement("p");
        if (data.name === username_login) {
            label.textContent = username_login + " " + data.time;
            p.textContent = data.text;
            userA.appendChild(label);
            userA.appendChild(p);
            smallBody.appendChild(userA);
            if (data.bold === true){
                p.style.fontWeight = "bold";
            }else{
                p.style.fontWeight = "normal";
            }
            if (data.italic === true){
                p.style.fontStyle = "italic";
            }else{
                p.style.fontStyle = "normal";
            }
        } else {
            label.textContent = data.name + " " + data.time;
            p.textContent = data.text;
            userB.appendChild(label);
            userB.appendChild(p);
            smallBody.appendChild(userB);
            if (data.bold === true){
                p.style.fontWeight = "bold";
            }else{
                p.style.fontWeight = "normal";
            }
            if (data.italic === true){
                p.style.fontStyle = "italic";
            }else{
                p.style.fontStyle = "normal";
            }
        }               
    }
    message_container.appendChild(smallBody);
};

// LOAD MESSAGES----------
function loard_message() {
    axios.get("/getmessage").then((response) => {
        show_message(response.data);
    });
    if (scrollAuto) {
        message_container.scrollTop = message_container.scrollHeight - message_container.clientHeight;
    }
};

// SEND MESSAGE----------
function send_message() {
     if (message_text.value !== "") {
        scrollAuto = true;
        let message_info = {
            username: username_login,
            text: message_text.value,
            bold: fontBold,
            italic: textItalic
        };
        axios.post(url + "/post", message_info).then((response) => {
            console.log(response.data);
        });
        message_text.value ="";
    };
};

// EMOJI----------
let emoji = document.querySelector("#emoji");
let picker = new EmojiButton();
document.addEventListener('DOMContentLoaded', () => {
    picker.on('emoji', emoji => {
        message_text.value += emoji;
    });
    emoji.addEventListener('click', () => {
        picker.togglePicker(emoji);
    });
});

// TEXT BOLD----------
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
let btnBold = document.querySelector("#btnBold");
btnBold.addEventListener("click", textBold);

// TEXT ITALIC----------
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
let btnItalic = document.querySelector("#btnItalic");
btnItalic.addEventListener("click", fontItalic);

// MAIN INFORMATION---------- 
let message_container = document.querySelector(".message_container")
let username_login = localStorage.getItem("username");
let password = localStorage.getItem("password");
let message_text = document.querySelector(".word");
let btn_send = document.getElementById("send");
btn_send.addEventListener("click", send_message);

// KEY ENTER----------
message_text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13){
        send_message();
    }
});

// REFRESH----------
setInterval(loard_message, 100);

// LOG OUT----------
function signout() {
    window.location.href = "../index.html";
}
let logOut = document.querySelector("#logOut");
logOut.addEventListener("click", signout);

message_container.addEventListener("scroll", () => {
    scrollAuto = false;
})