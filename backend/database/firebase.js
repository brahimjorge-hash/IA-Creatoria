const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json"); // Descomentar si usas el archivo JSON local

// Configuración si usas GOOGLE_APPLICATION_CREDENTIALS en Render
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Reemplazar por la URL de tu base de datos si usas Realtime Database
  // databaseURL: "https://<tu-project-id>.firebaseio.com" 
});

const db = admin.firestore();

module.exports = { db, admin };
