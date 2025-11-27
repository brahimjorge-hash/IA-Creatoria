const mercadopago = require('mercadopago');
const cfg = require('../config/mercadoPagoConfig');
const { addCredits } = require('../services/credits');

mercadopago.configure({ access_token: cfg.ACCESS_TOKEN });

exports.createPreference = async (req, res) => {
  try {
    const { userId, amount, description, credits } = req.body;
    if (!userId || !amount) return res.status(400).json({ error: 'missing params' });

    const frontendUrl = process.env.FRONTEND_URL || '';
    const preference = {
      items: [{ title: description || 'IA Creatoria credits', quantity: 1, unit_price: Number(amount) }],
      external_reference: JSON.stringify({ userId, credits }),
      back_urls: {
        success: frontendUrl + '/success',
        failure: frontendUrl + '/failure',
        pending: frontendUrl + '/pending'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    return res.json({ init_point: response.body.init_point, id: response.body.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'mp error' });
  }
};

exports.webhook = async (req, res) => {
  try {
    // Manejo básico de webhook: registrar y validar en producción
    const paymentId = (req.body.data && req.body.data.id) || req.query.id || null;
    console.log('MP webhook received:', { paymentId, body: req.body });

    // En implementación completa: consultar mercadopago.payment.findById(paymentId)
    // y si está approved, extraer external_reference y llamar a addCredits(userId, credits)

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal error' });
  }
};