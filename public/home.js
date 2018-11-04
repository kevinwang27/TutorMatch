document.getElementById('searchbtn').addEventListener('click', handleSearch);

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
    getUserObj();
    build();
} else {
    window.location = "www.placeholder.com/login";
}

var userObj;
async function getUserObj() {
    userObj = stitchClient.callFunction("getUserFromId", stitchClient.auth.user.id)[0];
}

function getTutors() {
    return stitchClient.callFunction("getTutors", userObj);
}

function getTutees() {
    return stitchClient.callFunction("getTutees", userObj);
}

function build() {
    var tutors;
    var tutees;
    if (userObj.type === "tutee") {
        tutors = getTutors();
        populateCards(tutors, "tutor");
    } else if (userObj.type === "tutor") {
        tutees = getTutees();
        populateCards(tutees, "tutee");
    } else {
        tutors = getTutors();
        tutees = getTutees();
        populateCards(tutors.concat(tutees), "both");
    }
}

function handleSearch() {

}

function populateCards(arr, type) {
    console.log("hi")
    var i;
    for (i = 0; i < arr.length; i++) {
        var infoBox = document.createElement("div");
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Name: " + arr.name)));
        if (type === "tutor" || type === "both") {
            var tutorClasses = document.createTextNode("Classes: " + arr.tutorClasses);
            var tutorPrice = document.createTextNode("Price: " + arr.tutorPrice);
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Tutoring classes: " + arr.tutorClasses)));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Asking rate per hour: " + arr.tutorPrice)));
        }
        if (type === "tutee" || type === "both") {
            var tuteeClasses = document.createTextNode("Classes: " + arr.tuteeClasses);
            var tuteePrice = document.createTextNode("Price: " + arr.tuteePrice);
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Need tutoring in: " + arr.tuteeClasses)));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Willing to pay: " + arr.tuteePrice)));
        }
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Availability: " + arr.day)));
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Contact: " + arr.email)));
        document.getElementById("info-box-container").appendChild(infoBox);
    }
}
