document.getElementById('signupbut').addEventListener('click', handleSignup);

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
  document.location.href="home.html";
}

async function handleSignup() {
    const arg = getSignupFormInfo();
    stitchClient.callFunction("addUser", arg);
    handleLogin();
}

async function handleLogin() {
  const email = arg.email;
  const password = arg.password;
  await emailPasswordAuth(email, password);
}

async function emailPasswordAuth(email, password) {
  if (!stitchClient.auth.isLoggedIn) {
    // Log the user in
    const credential = new UserPasswordCredential(email, password);
    await stitchClient.auth.loginWithCredential(credential);
  }
  document.location.href="home.html";
}

/* UI Management Functions */
function getSignupFormInfo() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const tuteeClassesEl = document.getElementById("tuteeClasses");
  const tutorClassesEl = document.getElementById("tutorClasses");
  const tuteePriceEl = document.getElementById("tuteePrice");
  const tutorPriceEl = document.getElementById("tutorPrice");
  // Parse out input text
  const name = nameEl.value;

  var type = null; 
  var inputElements = document.getElementsByClassName('vehicle');
  for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            type = inputElements[i].value;
            break;
        }
  }

  var day = null; 
  var inputs = document.getElementsByClassName('daycheck');
  for(var i=0; inputs[i]; ++i){
        if(inputs[i].checked){
            day = inputs[i].value;
            break;
        }
  }

  const email = emailEl.value;
  const password = passwordEl.value;
  const tuteeClasses = tuteeClassesEl.value.split(', ');
  const tutorClasses = tutorClassesEl.value.split(', ');
  const tuteePrice = tuteePriceEl.value;
  const tutorPrice = tutorPriceEl.value;
  // Remove text from login boxes
  nameEl.value = "";
  emailEl.value = "";
  passwordEl.value = "";
  tuteeClassesEl.value = "";
  tutorClassesEl.value = "";
  tuteePriceEl.value = "";
  tutorPriceEl.value = "";
  var karg = { name: name, type: type, email: email, password: password, day: day, tuteeClasses: tuteeClasses, tutorClasses: tutorClasses, tuteePrice: tuteePrice, tutorPrice: tutorPrice };
  console.log(karg);
  return karg;
}
