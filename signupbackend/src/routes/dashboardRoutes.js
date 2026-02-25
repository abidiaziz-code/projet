const express = require('express');
const router = express.Router();

// test route
router.get('/stats', (req, res) => {
  res.status(200).json({
    projects: 2,
    collaborators: 4,
    completedTasks: 10,
    productivity: '80%'
  });
});

router.get('/activity', (req, res) => {
  res.status(200).json({
    activities: [
      {
        type: 'login',
        title: 'Connexion',
        description: 'Utilisateur connecté avec succès',
        time: 'il y a 5 min'
      }
    ]
  });
});

module.exports = router;
