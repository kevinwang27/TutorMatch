// document.getElementById('searchbtn').addEventListener('click', handleSearch);

const APP_ID = "tutormatch-fxrqk";
const stitchClient = stitch.Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
    stitchClient.callFunction("getUserFromId", ["5bdf08f21c9d440000d2f9e3"]).then(result => {
        build(JSON.parse(result[0]));
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
        arr[i] = JSON.parse(arr[i]);
        var infoBox = document.createElement("div");
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Name: " + arr[i].name)));
        if (type === "tutor" || type === "both") {
            var tutorClasses = document.createTextNode("Classes: " + arr[i].tutorClasses);
            var tutorPrice = document.createTextNode("Price: " + arr[i].tutorPrice);
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Tutoring classes: " + arr[i].tutorClasses)));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Asking rate per hour: " + arr[i].tutorPrice)));
        }
        if (type === "tutee" || type === "both") {
            var tuteeClasses = document.createTextNode("Classes: " + arr[i].tuteeClasses);
            var tuteePrice = document.createTextNode("Price: " + arr[i].tuteePrice);
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Need tutoring in: " + arr[i].tuteeClasses)));
            infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Willing to pay: " + arr[i].tuteePrice)));
        }
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Availability: " + arr[i].day)));
        infoBox.appendChild(document.createElement("p").appendChild(document.createTextNode("Contact: " + arr[i].email)));
        document.getElementById("info-box-container").appendChild(infoBox);
    }
}
