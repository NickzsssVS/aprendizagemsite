const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./'));

// Rota para ler usuários
app.get('/users.json', (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        res.json(users);
    } catch (error) {
        res.json({});
    }
});

// Rota para salvar usuários
app.post('/users.json', (req, res) => {
    try {
        fs.writeFileSync('users.json', JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar usuário' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});