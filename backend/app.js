app.get("/test-firestore", async (req, res) => {
  try {
    const docRef = db.collection("pruebas").doc();
    await docRef.set({
      mensaje: "🔥 Firestore conectado correctamente",
      fecha: new Date(),
    });

    res.json({ ok: true, id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});
app.get("/test-firestore", async (req, res) => {
  try {
    const docRef = db.collection("pruebas").doc();
    await docRef.set({
      mensaje: "🔥 Firestore conectado correctamente",
      fecha: new Date(),
    });

    res.json({ ok: true, id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});
