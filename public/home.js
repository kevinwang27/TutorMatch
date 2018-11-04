// document.getElementById('searchbtn').addEventListener('click', handleSearch);

const APP_ID = "tutormatch-fxrqk";
const stitchClient = stitch.Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
    /*stitchClient.callFunction("getUserFromId", ["5bdf08f21c9d440000d2f9e3"]).then(result => {
        console.log(result[0]);
        build(result[0]);
    });*/
    build();
} else {
    document.location.href="index.html";
}

//userObj
function build() {
    //if (userObj.type === "tutee") {
        /*stitchClient.callFunction("getTutors", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "tutor");
        });*/
        result = [{name: "Josh", type: "tutor", email: "josh@email.com", password: "boshie", day: ["Monday", "Wednesday", "Friday"], tuteeClasses: ["cs61c", "cs70"], tutorClasses: ["cs61a"], tuteePrice: 4000, tutorPrice: 6000},
                  {name: "Kevin", type: "tutor", email: "kevin@email.com", password: "doggo", day: ["Tuesday", "Wednesday", "Friday"], tuteeClasses: [], tutorClasses: ["cs61a", "cs70"], tuteePrice: 5000, tutorPrice: 6000},
                  {name: "Carolyn", type: "tutor", email: "cw@email.com", password: "idk", day: ["Tuesday", "Wednesday", "Sunday"], tuteeClasses: ["cs61c", "cs70"], tutorClasses: ["cs61a"], tuteePrice: 5000, tutorPrice: 7000}]
        populateCards(result, "tutor");
    /*} else if (userObj.type === "tutor") {
        stitchClient.callFunction("getTutees", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "tutee");
        });

    } else {
        stitchClient.callFunction("getTutors", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "both");
        });
    }*/
}

function handleSearch() {

}

function populateCards(arr, type) {
    var i;
    for (i = 0; i < arr.length; i++) {
        var infoBox = document.createElement("div");
        infoBox.setAttribute("class", "info-box")
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Name: " + arr[i].name + "\n")));
        if (type === "tutor" || type === "both") {
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Tutoring classes: " + arr[i].tutorClasses + "\n")));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Asking rate per hour: " + arr[i].tutorPrice + "\n")));
        }
        if (type === "tutee" || type === "both") {
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Need tutoring in: " + arr[i].tuteeClasses + "\n")));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Willing to pay: " + arr[i].tuteePrice + "\n")));
        }
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Availability: " + arr[i].day + "\n")));
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Contact: " + arr[i].email + "\n")));
        document.getElementById("info-box-container").appendChild(infoBox);
    }
}
