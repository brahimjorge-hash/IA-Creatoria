const { db } = require('../database/firebase');

exports.addCredits = async (userId, credits) => {
  const userRef = db.collection('users').doc(userId);
  await userRef.update({ 
    credits: firebase.firestore.FieldValue.increment(credits) 
  });
};

exports.consumeCredits = async (userId, cost) => {
  const userRef = db.collection('users').doc(userId);
  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(userRef);
    if (!doc.exists) return false;
    let newCredits = doc.data().credits - cost;
    if (newCredits < 0) return false;
    transaction.update(userRef, { credits: newCredits });
    return true;
  });
};
