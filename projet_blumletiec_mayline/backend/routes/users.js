
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// POST : créer un utilisateur.
router.post('/', async (req, res) => {
    try {
        const { nom, email, motDePasse } = req.body;

        // Vérification des champs obligatoires.
        if (!nom || !email || !motDePasse) {
            return res.status(400).json({
                erreur: 'Tous les champs sont obligatoires.'
            });
        }

        // Vérification du format de l'adresse e-mail.
        const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValide.test(email)) {
            return res.status(400).json({
                erreur: 'Adresse e-mail invalide.'
            });
        }

        if (motDePasse.length < 8) {
            return res.status(400).json({
                erreur: 'Le mot de passe doit contenir au moins 8 caractères.'
            });
        }

        // Vérification de l'existence de l'utilisateur.
        const utilisateurExistant = await User.findOne({
            where: { email }
        });

        if (utilisateurExistant) {
            return res.status(409).json({
                erreur: 'Cette adresse e-mail est déjà utilisée.'
            });
        }

        // Hachage du mot de passe avant son enregistrement.
        const motDePasseHash = await bcrypt.hash(motDePasse, 10);

        const utilisateur = await User.create({
            nom,
            email,
            motDePasse: motDePasseHash
        });

        // Ne jamais retourner le mot de passe dans la réponse.
        res.status(201).json({
            id: utilisateur.id,
            nom: utilisateur.nom,
            email: utilisateur.email
        });

    } catch (error) {
        console.error('Erreur création utilisateur :', error);
        res.status(500).json({
            erreur: 'Impossible de créer cet utilisateur.'
        });
    }
});

// GET : récupérer tous les utilisateurs.
router.get('/', async (req, res) => {
    try {
        const utilisateurs = await User.findAll({
            attributes: ['id', 'nom', 'email'],
            order: [['id', 'ASC']]
        });

        res.json(utilisateurs);

    } catch (error) {
        console.error('Erreur récupération utilisateurs :', error);
        res.status(500).json({
            erreur: 'Impossible de récupérer les utilisateurs.'
        });
    }
});

// POST : authentification fictive.
router.post('/login', async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        if (!email || !motDePasse) {
            return res.status(400).json({
                erreur: 'E-mail et mot de passe obligatoires.'
            });
        }

        const utilisateur = await User.findOne({
            where: { email }
        });

        if (!utilisateur) {
            return res.status(401).json({
                erreur: 'Identifiants incorrects.'
            });
        }

        const motDePasseValide = await bcrypt.compare(
            motDePasse,
            utilisateur.motDePasse
        );

        if (!motDePasseValide) {
            return res.status(401).json({
                erreur: 'Identifiants incorrects.'
            });
        }

        res.json({
            message: 'Authentification réussie.',
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email
            }
        });

    } catch (error) {
        console.error('Erreur authentification :', error);
        res.status(500).json({
            erreur: 'Impossible de procéder à l’authentification.'
        });
    }
});

// DELETE : supprimer un utilisateur.
router.delete('/:id', async (req, res) => {
    try {
        const utilisateur = await User.findByPk(req.params.id);

        if (!utilisateur) {
            return res.status(404).json({
                erreur: 'Utilisateur introuvable.'
            });
        }

        await utilisateur.destroy();

        res.status(204).send();

    } catch (error) {
        console.error('Erreur suppression utilisateur :', error);
        res.status(500).json({
            erreur: 'Impossible de supprimer cet utilisateur.'
        });
    }
});

module.exports = router;
