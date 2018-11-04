// document.getElementById('searchbtn').addEventListener('click', handleSearch);

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
    stitchClient.callFunction("getUserFromId", [stitchClient.auth.user.id]).then(result => {
        build(result);
    });
} else {
    document.location.href="index.html";
}

async function getUserObj() {
    return stitchClient.callFunction("getUserFromId", stitchClient.auth.user.id)[0];
}

function build(userObj) {
    if (userObj.type === "tutee") {
        stitchClient.callFunction("getTutors", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "tutor");
        });

    } else if (userObj.type === "tutor") {
        stitchClient.callFunction("getTutees", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "tutee");
        });

    } else {
        stitchClient.callFunction("getTutors", [userObj]).then(result => {
            console.log(result);
            populateCards(result, "both");
        });
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
