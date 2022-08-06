// MENU SHOW
const showMenu = (toggleId, navId) => {

    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

//ACTIVE AND REMOVE MENU
//querySelectorAll is for class!
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {

    //Active link
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    //Remove menu mobile
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));

window.addEventListener("load", function () {
    document.getElementById("form").addEventListener("submit",
        function (e) {
            e.preventDefault();
            getCommentsByName();
        })
})

function getCommentsByName() {
    let name = document.getElementById("fname").value;
    req = new XMLHttpRequest();
    req.responseType = 'json';
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.readyState === 4 && this.status === 200) {
                const comments = this.response;
                if (comments.length == 0) {
                    alert("welcome to my web site")
                    postComments();
                } else {
                    // let num = comments[0].comment.length;
                    const dates = [];
                    comments.every(e => e.comment.every(e2 => dates.push(Date.parse(e2.date))));
                    let max_date = new Date(Math.max.apply(null, dates));
                    // let min_date = new Date(Math.min.apply(null, dates));
                    postComments();
                    alert("welcome back " + name + ",Your last comment was on" + max_date);
                }
            }
        }
    }
    req.open("GET", "http://localhost:3000/getByName/" + name, true);
    req.send();
}

function postComments() {
    let request = new XMLHttpRequest();
    let name = document.getElementById("fname").value;
    let comment = document.getElementById("farea").value;
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    }
    request.open("POST", "http://localhost:3000/add", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send('{"name":"' + name + '","comment":"' + comment + '"}');
    document.getElementById("fname").value = "";
    document.getElementById("farea").value = "";
}















