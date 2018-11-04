document.getElementById('btn').addEventListener('click', handleLogin);
document.getElementById('btn').addEventListener('click', handleSignup);

//const loginForm = document.getElementById("login-form");

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

if (stitchClient.auth.isLoggedIn) {
  window.location = "https://placeholder.com/home";
}

async function handleLogin() {
  const { email, password } = getLoginFormInfo();
  await emailPasswordAuth(email, password);
}

async function emailPasswordAuth(email, password) {
  if (!stitchClient.auth.isLoggedIn) {
    // Log the user in
    const credential = new UserPasswordCredential(email, password);
    await stitchClient.auth.loginWithCredential(credential);
  }
  window.location = "https://placeholder.com/home";
}

async function handleSignup() {
    const { name, email, year, password } = getSignupFormInfo();
}

/* UI Management Functions */
function getLoginFormInfo() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("pwd");
  // Parse out input text
  const email = emailEl.value;
  const password = passwordEl.value;
  // Remove text from login boxes
  emailEl.value = "";
  passwordEl.value = "";
  return { email: email, password: password };
}

function getSignupFormInfo() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const yearEl = document.getElementById("year");
  const passwordEl = document.getElementById("pwd");
  // Parse out input text
  const name = nameEl.value;
  const email = emailEl.value;
  const year = yearEl.value;
  const password = passwordEl.value;
  // Remove text from login boxes
  nameEl.value = "";
  emailEl.value = "";
  yearEl.value = "";
  passwordEl.value = "";
  return { name: name, email: email, year: year, password: password };
}
