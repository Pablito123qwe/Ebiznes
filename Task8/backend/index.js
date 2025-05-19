const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const SECRET = ''; // wstaw swój 
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());


const db = new sqlite3.Database('users.db');


db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);


app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email i hasło są wymagane' });

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashed],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Użytkownik już istnieje' });
      }
      res.json({ message: 'Rejestracja OK' });
    }
  );
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email i hasło są wymagane' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user)
      return res.status(401).json({ error: 'Niepoprawne dane logowania' });

    const isOk = await bcrypt.compare(password, user.password);
    if (!isOk)
      return res.status(401).json({ error: 'Niepoprawne dane logowania' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: '2h',
    });
    res.json({ token });
  });
});


app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Brak autoryzacji' });

  const token = auth.split(' ')[1];
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: 'Nieprawidłowy token' });
    db.get(
      'SELECT id, email FROM users WHERE id = ?',
      [payload.id],
      (err, user) => {
        if (err || !user)
          return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        res.json({ user });
      }
    );
  });
});

app.listen(PORT, () => console.log('API działa na http://localhost:' + PORT));
