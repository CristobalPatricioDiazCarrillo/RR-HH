const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) =>{
	const noticia = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['noticia']);
	res.render('layouts/inicio',{ noticia: noticia[0].texto });
});

router.get('/info', async (req, res) =>{
	const mision = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['mision']);
	const vision = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['vision']);
	res.render('layouts/info',{ mision: mision[0].texto, vision: vision[0].texto });
});

module.exports = router;