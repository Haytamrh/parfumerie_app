const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error', error));

const parfumSchema = new mongoose.Schema({
  nom: String,
  marque: String,
  type: String,
  genre: String,
  prix: Number,
  quantite: Number,
  qtestock: String,
  description: String,
  image: String
}, {
  collection: 'parfums',
  timestamps: true
});

const Parfum = mongoose.model('Parfum', parfumSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'public');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.get('/parfums', async (req, res) => {
  try {
    const parfums = await Parfum.find();
    res.json(parfums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/parfums', upload.single('image'), async (req, res) => {
  const { nom, marque, genre, prix, quantite, qtestock, description } = req.body;
  const image = req.file ? `/public/${req.file.filename}` : null;
  const newParfum = new Parfum({ nom, marque, genre, prix, quantite, qtestock, description, image });

  try {
    const savedParfum = await newParfum.save();
    res.status(201).json(savedParfum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/parfums/:nom', async (req, res) => {
  try {
    const nom = req.params.nom;
    const deletedParfums = await Parfum.deleteOne({ nom: nom });

    if (deletedParfums.deletedCount > 0) {
      res.status(200).json({ message: `Les parfums avec le genre '${nom}' ont été supprimés avec succès.` });
    } else {
      res.status(404).json({ message: `Aucun parfum avec le genre '${nom}' n'a été trouvé.` });
    }
  } catch (err) {
    console.error(`Erreur lors de la suppression des parfums avec le genre :'${nom}'`, err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression des parfums." });
  }
});
app.get('/parfums/:id', async (req, res) => {
  try {
    const parfum = await Parfum.findById(req.params.id);
    if (!parfum) {
      return res.status(404).json({ message: 'Parfum not found' });
    }
    res.json(parfum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const clientSchema = new mongoose.Schema({
  nom_client: String,
  mot_de_passe: String,
  adresse_email: String,
});

clientSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Client = mongoose.model('Client', clientSchema);

app.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { nom_client, mot_de_passe, adresse_email } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newClient = new Client({
      nom_client,
      mot_de_passe: hashedPassword,
      adresse_email,
    });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { adresse_email, mot_de_passe } = req.body;
    const client = await Client.findOne({ adresse_email });
    if (!client) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const isMatch = await bcrypt.compare(mot_de_passe, client.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ id: client._id }, 'votre_secret_jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
