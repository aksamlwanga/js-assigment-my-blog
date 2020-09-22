user_id = localStorage.getItem("loginID");

if (!user_id) {
    location.replace("../public/login.html");
}

const logout = document.getElementById("logout");

// logout the user 
logout.addEventListener("click", (event) => {
    // preventing the default behavior of a click
    event.preventDefault();
    // removing the user id from the localstorage
    localStorage.removeItem("loginID")
        // reloading the page so that the user is redirected to the login page
    location.reload();
});

// get items from localstorage
let data = localStorage.getItem("blog");

// check if data is not empty
if (data) {
    BLOGLIST = JSON.parse(data);

    ID = BLOGLIST.length; // set the id to the last one in the list
    loadList(BLOGLIST); //loading the useInterface
} else {
    // if data isn't empty no user
    BLOGLIST = [];
    ID = 0;
}

// load items to the user's interface
function loadList(BlogArray) {
    BlogArray.forEach(function(item) {
        addToBlog(item);
    });
}

function addToBlog(blog) {

    let data = localStorage.getItem("user");
    USERLIST = JSON.parse(data);


    // adding a new list as a first child to list
    const position = "afterbegin";
    //  defining the list items things it must contain


    const item = ` <li class="item"><article class="media content-section">
    <div class="media-body">
        <div class="article-metadata">
          <a class="mr-2" href="#">${USERLIST[blog.user_id].last_name } ${USERLIST[user_id].first_name}</a>
          <small class="text-muted">${blog.date}</small>
        </div>
        <h2><a class="article-title" href="#">${blog.title}</a></h2>
        <p class="article-content">${blog.content}</p>
    </div>
    </article>
    </li>`;



    list.insertAdjacentHTML(position, item);
    // location.reload();
}