const url = "http://192.168.70.69:3000/login";

// LOGIN TO CHAT APP----------
function openApp(event) {
    event.preventDefault();
    let data_input = {
        name: Username.value,
        password: Password.value
    };
    axios.post(url, data_input).then((response) => {
        let users = response.data;
        if (users) {
            localStorage.setItem("username", Username.value);
            localStorage.setItem("password", Password.value);
            window.location.href = "message/message.html";
        } else {
            let h4Hide = document.querySelector("#f");
            let show = document.querySelector("#wup");
            h4Hide.style.display = "none";
            show.style.display = "block";
            show.style.color = "red";
            body.appendChild(show);
        }
    });
};

// MAIN----------
let login = document.querySelector("#btn");
login.addEventListener("click", openApp);

let Username = document.querySelector("#username");
let Password = document.querySelector("#password");