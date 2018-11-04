const loginForm = document.getElementById("login-form");

const APP_ID = "tutormatch-fxrqk";
const {
  Stitch,
  UserPasswordCredential,
} = stitch;
const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);

const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('tutorDB');

if (stitchClient.auth.isLoggedIn) {
  hideLoginForm();
  revealDashboardContainer();
  build(Date.now());
}

async function handleLogin() {
  const { email, password } = getLoginFormInfo();
  await emailPasswordAuth(email, password);
  build(Date.now());
}

async function emailPasswordAuth(email, password) {
  if (!stitchClient.auth.isLoggedIn) {
    // Log the user in
    const credential = new UserPasswordCredential(email, password);
    await stitchClient.auth.loginWithCredential(credential);
  }
  hideLoginForm();
  revealDashboardContainer();
}

/*client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
  db.collection('users').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
  db.collection('users').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
  console.error(err)
});*/

/* UI Management Functions */
function getLoginFormInfo() {
  const emailEl = document.getElementById("emailInput");
  const passwordEl = document.getElementById("passwordInput");
  // Parse out input text
  const email = emailEl.value;
  const password = passwordEl.value;
  // Remove text from login boxes
  emailEl.value = "";
  passwordEl.value = "";
  return { email: email, password: password };
}

function hideLoginForm() {
  const user = stitchClient.auth.user;
  loginForm.classList.add("hidden");
  // Set login status message
  statusMessage.innerText = "Logged in as: " + user.profile.data.email;
};

function revealDashboardContainer() {
  const container = document.getElementById("dashboard-container");
  container.classList.remove("hidden");
}
