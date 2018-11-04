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
        populateCards(tutors);
    } else if (userObj.type === "tutor") {
        tutees = getTutees();
        populateCards(tutees);
    } else {
        tutors = getTutors();
        tutees = getTutees();
        populateCards(tutors.concat(tutees));
    }
}

function populateCards(arr) {
    
}
