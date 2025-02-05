const express = require('express');
const router = express.Router();
const authenticateJWT = require('../authentification/authenticateToken');
const { registerUser, loginUser, selectDatabase, getLatestDevisByYear,getAllSectors, sendPasswordResetEmail, passwordReset } = require('../controllers/UserController');
const { getDevisDetails,getAllClients } = require('../controllers/UserController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/passwordResetRequest', sendPasswordResetEmail);
router.put('/passwordReset', passwordReset);
router.post('/select-database', selectDatabase);
router.get('/get-devis-details/:databaseName/:NUMBL', getDevisDetails);

router.get('/get-devis-details/:databaseName', getLatestDevisByYear);
router.get('/:databaseName/clients', getAllClients);

router.get('/secteurs/:databaseName', getAllSectors);



module.exports = router;
