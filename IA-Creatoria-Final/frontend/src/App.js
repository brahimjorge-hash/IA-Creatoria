import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('user-sandbox-123'); // ID de usuario de prueba
  const [credits, setCredits] = useState(0);

  // Simulación: Obtener créditos del backend al cargar
  useEffect(() => {
    // Reemplazar por fetch real a tu backend desplegado
    // fetch(`your-backend-url.com{userId}`)
    //   .then(res => res.json())
    //   .then(data => setCredits(data.credits || 0));
    setCredits(50); // Valor estático por ahora
  }, [userId]);

  const handlePayment = async () => {
    // Llama al backend para crear una preferencia de pago
    const response = await fetch('http://localhost:5000/api/mercadopago/create_preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        amount: 100,
        description: 'Paquete de 1000 creditos IA',
        credits: 1000
      }),
    });
    const data = await response.json();
    if (data.init_point) {
      // Redirige al usuario al punto de inicio de Mercado Pago
      window.location.href = data.init_point;
    } else {
      alert('Error al crear preferencia de pago');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IA Creatoria</h1>
        <p>Tus créditos disponibles: {credits}</p>
        <button onClick={handlePayment}>Comprar Créditos (Sandbox $100)</button>
        <p>Revisa `LEER_PRIMERO_PAGOS.txt` para instrucciones de despliegue.</p>
      </header>
    </div>
  );
}

export default App;
