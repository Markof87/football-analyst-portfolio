const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve i file statici dalla cartella corrente (dove si trovano i tuoi file HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, '/')));

// Risponde a tutte le richieste con il file index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Avvia il server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
