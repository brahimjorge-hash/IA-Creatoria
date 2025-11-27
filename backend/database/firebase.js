const admin = require('firebase-admin');

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } catch (err) {
    console.error('Invalid FIREBASE_SERVICE_ACCOUNT JSON');
    throw err;
  }
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
} else {
  // Fallback: initialize without explicit credentials (may fail if none provided)
  admin.initializeApp();
}

const db = admin.firestore();

module.exports = { db, admin };