document.getElementById('login-form-btn').addEventListener('click', handleSignup);

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
  window.location = "https://placeholder.com/home";
}

async function handleSignup() {
    const arg = getSignupFormInfo();
    stitchClient.callFunction("addUser", arg);
    handleLogin();
}

async function handleLogin() {
  const { email, password } = { arg.email, arg.password };
  await emailPasswordAuth(email, password);
}

async function emailPasswordAuth(email, password) {
  if (!stitchClient.auth.isLoggedIn) {
    // Log the user in
    const credential = new UserPasswordCredential(email, password);
    await stitchClient.auth.loginWithCredential(credential);
  }
  fwindow.location = "https://placeholder.com/home";
}

/* UI Management Functions */
function getSignupFormInfo() {
  const nameEl = document.getElementById("name");
  const typeEl = document.getElementById("type");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const dayEl = document.getElementById("day");
  const tuteeClassesEl = document.getElementById("tuteeClasses");
  const tutorClassesEl = document.getElementById("tutorClasses");
  const tuteePriceEl = document.getElementById("tuteePrice");
  const tutorPriceEl = document.getElementById("tutorPrice");
  // Parse out input text
  const name = nameEl.value;
  const type = typeEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;
  const day = dayEl.value.split(', ');
  const tuteeClasses = tuteeClassesEl.value.split(', ');
  const tutorClasses = tutorClassesEl.value.split(', ');
  const tuteePrice = tuteePriceEl.value.split(', ');
  const tutorPrice = tutorPriceEl.value.split(', ');
  // Remove text from login boxes
  nameEl.value = "";
  emailEl.value = "";
  typeEl.value = "";
  passwordEl.value = "";
  dayEl.value = "";
  tuteeClassesEl.value = "";
  tutorClassesEl.value = "";
  tuteePriceEl.value = "";
  tutorPriceEl.value = "";
  return { name: name, type: type, email: email, password: password, day: day, tuteeClasses: tuteeClasses, tutorClasses: tutorClasses, tuteePrice: tuteePrice, tutorPrice: tutorPrice };
}
