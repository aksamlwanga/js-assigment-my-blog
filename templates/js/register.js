user_id = localStorage.getItem("loginID");

if (user_id) {
    location.replace("../public/home.html");
}
// getting all elements from our form

const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const password = document.getElementById("password");
const rePassword = document.getElementById("re_password");
const email = document.getElementById("email");
const saveBtn = document.getElementById("saveBtn");

//getting the element value 
const getElementValue = (element) => {
    return element.value;
};

// setting the id for each user and user list
let USERLIST, ID;
// get items from localstorage
let data = localStorage.getItem("user");

// check if data is not empty
if (data) {
    USERLIST = JSON.parse(data);
    console.log(USERLIST);
    ID = USERLIST.length; // set the id to the last one in the lis
} else {
    // if data isn't empty no user
    USERLIST = [];
    ID = 0;
}

// user object that will be added to local storage
const user = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    id: ""
}

console.log(user);

// adding an event handler on the savBtn
saveBtn.addEventListener("click", (event) => {
    // preventing the default behavior of a click
    event.preventDefault();
    // getting all the input value for our registration form
    const first_name_value = getElementValue(firstName);
    const last_name_value = getElementValue(lastName);
    const password_value = getElementValue(password);
    const rePassword_value = getElementValue(rePassword);
    const email_value = getElementValue(email);

    console.log(password_value, rePassword_value);
    // validating the  entered password 
    if (!(password_value == rePassword_value)) {
        password.value = "";
        rePassword.value = "";
        return window.alert("password do match ");
    } else {
        // setting property value for each user 
        user.first_name = first_name_value;
        user.last_name = last_name_value;
        user.password = password_value;
        user.email = email_value;
        user.id = ID;
        // adding to user list
        USERLIST.push(user);
        // adding a user as serialized list
        localStorage.setItem("user", JSON.stringify(USERLIST));
        location.replace("../public/login.html");

        // incrementing the id value for next value
        // ID++;
    }

});