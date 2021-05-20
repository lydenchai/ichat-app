const IP = "192.168.88.19";
const PORT = 3000;
const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT + "/login";

function login(e) {
  e.preventDefault();

  //Create the REQUEST
  let querry = GET_LOGIN_REQUEST + "?name=" + userName.value + "&password=" + password.value;
  axios.get(querry).then((response) => {
    let isValid = response.data;
    let text = "Wrong password or username";
    let color = "red";

    //check to change color to green and text= "Login success!" if login success.
    // if (isValid === true){
    //   text = "Successful Login";
    //   color = "green";
    // }
    message.textContent = text;
    message.style.color = color;
  });
}

// MAIN---------------------------------------------------------------------------------------------
const message = document.querySelector("#message");
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");

btn.addEventListener("click", login);