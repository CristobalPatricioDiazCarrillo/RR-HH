const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
	res.render('layouts/inicio');
});

router.get('/info', (req, res) =>{
	res.render('layouts/info');
});

module.exports = router;