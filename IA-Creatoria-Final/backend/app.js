require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mpRoutes = require('./routes/mercadoPagoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// health
app.get('/health', (req,res)=> res.json({ok:true}));

app.use('/api/mercadopago', mpRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('IA Creatoria backend running on port', PORT));
