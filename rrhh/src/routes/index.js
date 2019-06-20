const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/', async (req, res) =>{
	const noticia = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['noticia']);
	res.render('layouts/inicio',{ noticia: noticia[0].texto });
});

router.get('/info', async (req, res) =>{
	const mision = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['mision']);
	const vision = await pool.query('SELECT * FROM informaciones WHERE nombre=?',['vision']);
	res.render('layouts/info',{ mision: mision[0].texto, vision: vision[0].texto });
});

//Pagina Profile
router.get('/profile', isLoggedIn, async (req, res) => {
	var informaciones = await pool.query('SELECT * FROM informaciones');
	var noticia = informaciones[0].texto;
	var mision = informaciones[1].texto;
	var vision = informaciones[2].texto
	res.render('other/profile', { noticia: noticia, mision: mision, vision: vision });
});

router.post('/profile/notice', isLoggedIn, async (req, res) => {
	var noticia = req.body.noticia;
	await pool.query('UPDATE informaciones SET texto = ? WHERE id = 1', [noticia]);
	res.redirect('/profile');
});

router.post('/profile/mision', isLoggedIn, async (req, res) => {
	var mision = req.body.mision;
	await pool.query('UPDATE informaciones SET texto = ? WHERE id = 2', [mision]);
	res.redirect('/profile');
});

router.post('/profile/vision', isLoggedIn, async (req, res) => {
	var vision = req.body.vision;
	await pool.query('UPDATE informaciones SET texto = ? WHERE id = 3', [vision]);
	res.redirect('/profile');
S});

router.get('/area', isLoggedIn, async (req, res) => {
	var areas = await pool.query('SELECT * FROM areas');
	res.render('other/area',{areas:areas});
});

router.post('/area/add', isLoggedIn, async (req, res) => {
	await pool.query('INSERT INTO areas(nombre) VALUES (?)', [req.body.nombre]);
	res.redirect('/area');
});

router.post('/area/delete/:nombre', isLoggedIn, async (req, res) => {
	var existe = await pool.query('SELECT * FROM trabajadores WHERE area = ?', [req.params.nombre]);
	if(existe==""){
		await pool.query('DELETE FROM areas WHERE nombre = ?',[req.params.nombre]);
		res.redirect('/area');
	}
	else{
		req.flash('message', 'Antes debe eliminar o mover los trabajadores');
		res.redirect('/area');
	}
	res.redirect('/area');
});

module.exports = router;