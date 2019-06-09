const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
	const trabajadores = await pool.query('SELECT * FROM trabajadores');
	res.render('trabajadores/list', {trabajadores:trabajadores});
});

router.get('/add', isLoggedIn, (req, res) => {
	res.render('trabajadores/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
	const { nombre, apellido, rut, fecha_nacimiento, area, nivel_estudios, nivel_capacitacion, num_capacitacion } = req.body;
	const newTrabajador = {
		nombre,
		apellido,
		rut,
		fecha_nacimiento,
		area,
		nivel_estudios,
		nivel_capacitacion,
		num_capacitacion
	};
	await pool.query('INSERT INTO trabajadores SET ?', [newTrabajador]);
	req.flash('success', 'Agregado satisfactoriamente');
	res.redirect('/trabajadores');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM trabajadores WHERE id = ?', [id]);
	req.flash('success', 'Trabajador removido satisfactoriamente');
	res.redirect('/trabajadores');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const trabajador = await pool.query('SELECT * FROM trabajadores WHERE id = ?', [id]);
	res.render('trabajadores/edit',{trabajador: trabajador[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { nombre, apellido, rut, fecha_nacimiento, area, nivel_estudios, nivel_capacitacion, num_capacitacion } = req.body;
	const newTrabajador = {
		nombre,
		apellido,
		rut,
		fecha_nacimiento,
		area,
		nivel_estudios,
		nivel_capacitacion,
		num_capacitacion
	};
	await pool.query('UPDATE trabajadores SET ? WHERE id= ?', [newTrabajador, id]);
	req.flash('success', 'Trabajador editado satisfactoriamente');
	res.redirect('/trabajadores');
});

module.exports = router;