const title = document.getElementById("title");
const list = document.getElementById("list");
const logout = document.getElementById("logout");
const contents = document.getElementById("content");
const saveNewBlog = document.getElementById("saveNewBlog");


user_id = localStorage.getItem("loginID");

if (!user_id) {
    location.replace("../public/login.html");
}
// setting the id for each user and user list
let USERLIST, ID;
// get items from localstorage
let data = localStorage.getItem("blog");

// check if data is not empty
if (data) {
    BLOGLIST = JSON.parse(data);

    ID = BLOGLIST.length; // set the id to the last one in the list
    console.log(BLOGLIST);
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

// logout the user 
logout.addEventListener("click", (event) => {
    // preventing the default behavior of a click
    event.preventDefault();
    // removing the user id from the localstorage
    localStorage.removeItem("loginID")
        // reloading the page so that the user is redirected to the login page
    location.reload();
});
saveNewBlog.addEventListener("click", function(even) {
    //  blog object 
    const Blog = {
            user_id: user_id,
            date: "",
            content: "",
            id: "",
            title: ""
        }
        // the user pressing the enter key so that we can ge the value entered

    const blogTitle = title.value;
    const blogContent = contents.value;
    var d = new Date();
    // if the input isn't empty
    if (blogTitle && blogContent) {
        Blog.title = blogTitle
        Blog.content = blogContent;
        Blog.date = formatDate(d);
        Blog.id = ID;
        addToBlog(Blog);
        BLOGLIST.push(Blog);

        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("blog", JSON.stringify(BLOGLIST));
        ID++;

    }


});

// changing date to human readable language
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

function addToBlog(blog) {

    let data = localStorage.getItem("user");
    USERLIST = JSON.parse(data);




    if (!(blog.user_id == user_id)) {
        return;
    }
    // adding a new list as a first child to list
    const position = "afterbegin";
    //  defining the list items things it must contain

    const item = ` <li class="item"><article class="media content-section">
<div class="media-body">
    <div class="article-metadata">
      <a class="mr-2" href="#">${USERLIST[user_id].last_name } ${USERLIST[user_id].first_name}</a>
      <small class="text-muted">${blog.date}</small>
    </div>
    <h2><a class="article-title" href="#">${blog.title}</a></h2>
    <p class="article-content">${blog.content}</p>
</div>
</article>
<button id="editBtn" edit=${blog.id}>Edit</button>
<button id="removeBtn"  task="${blog.id}">Remove</button>
</li>`;

    // attaching the list to first ul 
    list.insertAdjacentHTML(position, item);

}

list.addEventListener("click", (event) => {
    //  getting the target element
    const element = event.target;

    let blogsArray = JSON.parse(localStorage.getItem("blog"))

    if (element.attributes.task) {

        const elementJob = element.attributes.task.value;
        //actual localStorage item removing call it delete

        blogsArray.splice(blogsArray.indexOf(elementJob), 1)
        localStorage.setItem("blog", JSON.stringify(blogsArray));

        //removing the parent node
        element.parentNode.parentNode.removeChild(element.parentNode);
        // location.reload();

    }

    //  getting the edit attribute so that we can update it
    if (element.attributes.edit) {

        var content = prompt("hello");


        // getting the blog object at aparticular index   
        var blogObject = blogsArray[element.attributes.edit.value]
            // updating the value for content of the blog
        blogObject.content = content;

        localStorage.setItem("blog", JSON.stringify(blogsArray));
        location.reload();
        // //Log object to console again.
        // console.log("After update: ", blogsArray[objIndex])

        // // const elementJob = element.attributes.task.value;
    }
});