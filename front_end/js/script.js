// Add Text
let smallBody = document.querySelector("#smallBody");
let message = document.querySelector("#text");

function addMessage() {
    if (message.value != "") {
        let label = document.createElement("label");
        label.textContent = ("LYHEANG");
        let text = document.createElement("p");
        text.textContent = message.value;
        let div = document.createElement("div");
        div.className = "userA";
        div.appendChild(label);
        div.appendChild(text);
        smallBody.appendChild(div);
    }
    message.value = "";


}
let add = document.querySelector("#btnSend");
add.addEventListener('click', addMessage);
message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        addMessage();
        message.value = "";
    }
});

// Send Emoji
function addEmoji() {
    let label = document.createElement("label");
    label.textContent = ("LYHEANG");
    let text = document.createElement("p");
    text.textContent = ": )";
    let div = document.createElement("div");
    div.className = "userA";
    div.appendChild(label);
    div.appendChild(text);
    smallBody.appendChild(div);

}
let emoji = document.querySelector("#emojiLogo");
emoji.addEventListener('click', addEmoji);