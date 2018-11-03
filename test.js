const client = stitch.Stitch.initializeDefaultAppClient('tutormatch-fxrqk');

const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('tutorDB');

client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user => 
  db.collection('users').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() => 
  db.collection('users').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
  console.error(err)
});

