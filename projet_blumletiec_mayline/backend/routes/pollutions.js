
const express = require('express');
const Pollution = require('../models/Pollution');

const router = express.Router();

// Vérifie les données reçues pour une pollution.
function validatePollution(data) {
    const requiredFields = [
        'titre',
        'type',
        'description',
        'date',
        'codePostal',
        'ville',
        'pays',
        'latitude',
        'longitude'
    ];

    for (const field of requiredFields) {
        if (
            data[field] === undefined ||
            data[field] === null ||
            data[field] === ''
        ) {
            return `Le champ ${field} est obligatoire.`;
        }
    }

    if (!Number.isFinite(Number(data.latitude)) ||
        !Number.isFinite(Number(data.longitude))) {
        return 'Les coordonnées GPS doivent être des nombres.';
    }

    if (Number(data.latitude) < -90 ||
        Number(data.latitude) > 90 ||
        Number(data.longitude) < -180 ||
        Number(data.longitude) > 180) {
        return 'Les coordonnées GPS sont invalides.';
    }

    return null;
}

// GET : récupérer toutes les pollutions.
router.get('/', async (req, res) => {
    try {
        const pollutions = await Pollution.findAll({
            order: [['id', 'ASC']]
        });

        res.json(pollutions);
    } catch (error) {
        console.error('Erreur récupération pollutions :', error);
        res.status(500).json({
            erreur: 'Impossible de récupérer les pollutions.'
        });
    }
});

// GET : récupérer une pollution par son identifiant.
router.get('/:id', async (req, res) => {
    try {
        const pollution = await Pollution.findByPk(req.params.id);

        if (!pollution) {
            return res.status(404).json({
                erreur: 'Pollution introuvable.'
            });
        }

        res.json(pollution);
    } catch (error) {
        console.error('Erreur récupération pollution :', error);
        res.status(500).json({
            erreur: 'Impossible de récupérer cette pollution.'
        });
    }
});

// POST : ajouter une pollution.
router.post('/', async (req, res) => {
    try {
        const validationError = validatePollution(req.body);

        if (validationError) {
            return res.status(400).json({
                erreur: validationError
            });
        }

        const pollution = await Pollution.create(req.body);

        res.status(201).json(pollution);
    } catch (error) {
        console.error('Erreur création pollution :', error);
        res.status(500).json({
            erreur: 'Impossible de créer la pollution.'
        });
    }
});

// PUT : modifier une pollution.
router.put('/:id', async (req, res) => {
    try {
        const pollution = await Pollution.findByPk(req.params.id);

        if (!pollution) {
            return res.status(404).json({
                erreur: 'Pollution introuvable.'
            });
        }

        const validationError = validatePollution({
            ...pollution.toJSON(),
            ...req.body
        });

        if (validationError) {
            return res.status(400).json({
                erreur: validationError
            });
        }

        const allowedFields = [
            'titre',
            'type',
            'description',
            'date',
            'codePostal',
            'ville',
            'pays',
            'rue',
            'numero',
            'latitude',
            'longitude',
            'photoUrl'
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        await pollution.update(updates);

        res.json(pollution);
    } catch (error) {
        console.error('Erreur modification pollution :', error);
        res.status(500).json({
            erreur: 'Impossible de modifier la pollution.'
        });
    }
});

// DELETE : supprimer une pollution.
router.delete('/:id', async (req, res) => {
    try {
        const pollution = await Pollution.findByPk(req.params.id);

        if (!pollution) {
            return res.status(404).json({
                erreur: 'Pollution introuvable.'
            });
        }

        await pollution.destroy();

        res.status(204).send();
    } catch (error) {
        console.error('Erreur suppression pollution :', error);
        res.status(500).json({
            erreur: 'Impossible de supprimer la pollution.'
        });
    }
});

module.exports = router;
