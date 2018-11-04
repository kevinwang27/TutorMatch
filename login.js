document.getElementById('loginbtn').addEventListener('click', handleLogin);
document.getElementById('signupbtn').addEventListener('click', handleSignup);

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
  fwindow.location = "https://placeholder.com/home";
}

async function handleSignup() {
  console.log("clicked");
}

/* UI Management Functions */
function getLoginFormInfo() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  // Parse out input text
  const email = emailEl.value;
  const password = passwordEl.value;
  // Remove text from login boxes
  emailEl.value = "";
  passwordEl.value = "";
  return { email: email, password: password };
}
