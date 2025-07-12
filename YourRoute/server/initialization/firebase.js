/*
This script initializes a connection to a Firestore database using the Firebase Admin SDK, simplifying data management tasks in Node.js applications.
*/

const admin = require('firebase-admin')
require('dotenv').config()

let serviceAccount
if (process.env.FIREBASE_KEY && process.env.FIREBASE_KEY.endsWith('.json')) {
  serviceAccount = require(process.env.FIREBASE_KEY)
} else if (process.env.FIREBASE_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY)
} else {
  throw new Error('FIREBASE_KEY environment variable is not set!')
}

let defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let defaultDatabase = admin.firestore(defaultApp)

module.exports = defaultDatabase
