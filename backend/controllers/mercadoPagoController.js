const mercadopago = require('mercadopago');
const cfg = require('../config/mercadoPagoConfig');
const { addCredits } = require('../services/credits');

mercadopago.configure({ access_token: cfg.ACCESS_TOKEN });

exports.createPreference = async (req, res) => {
  try {
    const { userId, amount, description, credits } = req.body;
    if(!userId || !amount) return res.status(400).json({ error:'missing params' });
    const preference = {
      items: [{ title: description || 'IA Creatoria credits', quantity: 1, unit_price: Number(amount) }],
      external_reference: JSON.stringify({ userId, credits }),
      back_urls: { success: process.env.FRONTEND_URL + '/success', failure: process.env.FRONTEND_URL + '/failure', pending: process.env.FRONTEND_URL + '/pending' },
      auto_return: 'approved'
    };
    const response = await mercadopago.preferences.create(preference);
    return res.json({ init_point: response.body.init_point, id: response.body.id });
  } catch (err) { console.error(err); return res.status(500).json({ error:'mp error' }); }
};

exports.webhook = async (req, res) => {
  try {
    const id = (req.body.data && req.body.data.id) || req.query.id;
    // Aquí se manejaría la notificación de pago real de MP (implementación avanzada)
    // Se debería verificar el estado del pago y luego llamar a addCredits(userId, credits)
    console.log("Webhook recibido para ID:", id);
    return res.status(200).json({ok: true});
  } catch (err) { 
    console.error(err); 
    return res.status(500).json({ error:'internal error' }); 
  }
};
