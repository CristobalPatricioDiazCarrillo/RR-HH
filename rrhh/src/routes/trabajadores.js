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


router.get('/Graficos', isLoggedIn, async (req, res) => {
	const bas_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Basica Incompleta"');
	const bas_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Basica Completa"');
	const med_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Media Incompleta"');
	const med_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Media Completa"');
	const sup_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Superior Incompleta"');
	const sup_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Superior Completa"');

	var Capacitaciones = await pool.query('SELECT nombre FROM `areas`');
	var areas = {};
	const sumas_array = {};
	var count = 0;
	for(var i = 0; i < Object.keys(Capacitaciones).length;i++){
		areas[Capacitaciones[i].nombre]= await pool.query('SELECT sum(`nivel_capacitacion`) FROM `trabajadores` where `area` =  "'+Capacitaciones[i].nombre+'";'); 
		
	}

	res.render('trabajadores/Graficos',{areas:areas,bas_in:bas_in,bas_com:bas_com,med_in:med_in,med_com:med_com,sup_in:sup_in,sup_com:sup_com});
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