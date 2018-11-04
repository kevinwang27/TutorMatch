const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
    await getUserObj();
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

function populateCards(arr, type) {
    var i;
    var person;
    for (i = 0; i < arr.length; i++) {
        if (type === "tutor" || type === "both") {
            person = document.createTextNode("Name: " + arr.name + "\nClasses: " + arr.tutorClasses + "\nAvailabilities: "
                                            + arr.day + "\nPrice: " + arr.tutorPrice + "\nEmail: " + arr.email);
        }
        if (type === "tutee" || type === "both") {
            person = document.createTextNode("Name: " + arr.name + "\nClasses: " + arr.tuteeClasses + "\nAvailabilities: "
                                            + arr.day + "\nPrice: " + arr.tuteePrice + "\nEmail: " + arr.email);
        }
        document.getElementById("myList").appendChild(person);
    }
}
