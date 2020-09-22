const rePassword = document.getElementById("re_password");
const email = document.getElementById("email");
const saveBtn = document.getElementById("saveBtn");


user_id = localStorage.getItem("loginID");

if (user_id) {
    location.replace("../public/home.html");
}
//getting the element value 
const getElementValue = (element) => {
    return element.value;
};

// get items from localstorage
let data = localStorage.getItem("user");
let USERLIST;
if (data) {
    USERLIST = JSON.parse(data);
} else {
    location.replace("../public/register.html");
}




saveBtn.addEventListener("click", (event) => {
    // preventing the default behavior of a click
    event.preventDefault();

    // getting all the input value for our login form
    const password_value = getElementValue(password);
    const email_value = getElementValue(email);

    // Looping through elements stored in our localStorage
    for (var index = 0; index < USERLIST.length; index++) {
        // to redirect the user if match
        if (USERLIST[index].email == email_value && USERLIST[index].password == password_value) {
            // storing the current user 
            localStorage.setItem("loginID", USERLIST[index].id);
            location.replace("../public/home.html");
            break;
        }
        // otherwise send back  message
        if (USERLIST.length == (index + 1)) {
            window.alert("Wrong Email or Password");
        }

    }

});