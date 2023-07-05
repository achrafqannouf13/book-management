const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, typeuser } = req.body;

    const user = new UserModel({
      username,
      password,
      email,
      typeuser,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// Récupérer un utilisateur par son identifiant
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { username, password, email, typeuser } = req.body;

    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    user.username = username;
    user.password = password;
    user.email = email;
    user.typeuser = typeuser;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};
// Inscrire un utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Créer une nouvelle instance de l'utilisateur
    const newUser = new UserModel({
      username,
      email,
      password
    });

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Réponse de succès
    return res.status(201).json({ message: 'L\'utilisateur a été inscrit avec succès.' });
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'inscription:', error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
  }
};


//login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Recherchez l'utilisateur dans la base de données
    const user = await UserModel.findOne({ username });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(404).send('Nom d\'utilisateur ou mot de passe invalide !');
    }

    //Vérifiez le mot de passe
    validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(481).send('Nom d\'utilisateur ou mot de passe invalide.. !');
    }

    // Générez un token JWT pour l'authentification
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, '1234567');

    // Retournez le token
    res.status(200).send({ mytoken: token });
  } catch (error) {
    console.error('Une erreur est survenue lors de la connexion:', error);
    res.status(500).send('Une erreur est survenue lors de la connexion.');
  }
};



