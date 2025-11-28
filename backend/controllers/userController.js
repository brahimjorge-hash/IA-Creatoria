const { db } = require('../database/firebase');
const { consumeCredits } = require('../services/credits');

exports.registerUser = async (req, res) => {
  try {
    const { email, deviceId } = req.body;
    const usersRef = db.collection('users');
    let snap = null;
    if(email){
      snap = await usersRef.where('email','==',email).get();
    } else if(deviceId){
      snap = await usersRef.where('deviceId','==',deviceId).get();
    }
    if(snap && !snap.empty){
      const doc = snap.docs[0];
      return res.json({ id: doc.id, credits: doc.data().credits });
    }
    const newUser = { email: email || null, deviceId: deviceId || null, credits: 50, createdAt: new Date() };
    const ref = await usersRef.add(newUser);
    return res.json({ id: ref.id, credits: newUser.credits });
  } catch(err){ console.error(err); return res.status(500).json({error:'internal'}); }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const doc = await db.collection('users').doc(id).get();
  if(!doc.exists) return res.status(404).json({error:'not found'});
  return res.json({ id: doc.id, ...doc.data() });
};

exports.useCredits = async (req, res) => {
  const id = req.params.id;
  const { cost } = req.body;
  if(!cost) return res.status(400).json({error:'cost required'});
  const ok = await consumeCredits(id, Number(cost));
  if(!ok) return res.status(402).json({ error:'insufficient credits' });
  return res.json({ ok:true });
};
