const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const path = require('path');
const fs = require('fs');

router.get('/', isLoggedIn, async (req, res) => {
	const trabajadores = await pool.query('SELECT * FROM trabajadores WHERE estado=0');
	for (var i = 0; i<trabajadores.length; i++) {
		var nombre = trabajadores[i].nombre;
		var apellido = trabajadores[i].apellido;
		nombre = nombre.split(' ');
		apellido = apellido.split(' ');
		trabajadores[i].nombre = nombre[0];
		trabajadores[i].apellido = apellido[0];
	}
	const areas = await pool.query('SELECT * FROM areas');
	res.render('workers/list', {trabajadores: trabajadores, areas: areas});
});

router.get('/add', isLoggedIn, async (req, res) => {
	const areas = await pool.query('SELECT * FROM areas');
	res.render('workers/add', { areas: areas });
});

router.post('/add', isLoggedIn, async (req, res) => {
	var image;
	if (req.file){
		image = 'tei';
		fs.rename(path.join(__dirname)+'/../image/undefined.jpg',path.join(__dirname)+'/../image/undefined.jpg'.replace('undefined.jpg', image +'.jpg'),function(err) {
		    if (err) {
		    	req.flash('message', 'Formato de imagen incorrecto');
		        res.redirect('/workers/add');
		    }
		});
	}
	else {
		image = 'default';
	}
	var { nombre, apellido, rut, fecha_nacimiento, area, correo, telefono, nacionalidad, estado_civil, genero, region, comuna, direccion, nivel_estudios, nivel_capacitacion, num_capacitacion } = req.body;
	nombre = nombre.toUpperCase();
	apellido = apellido.toUpperCase();
	const newTrabajador = {
		nombre,
		apellido,
		rut,
		fecha_nacimiento,
		area,
		correo,
		telefono,
		nacionalidad,
		estado_civil,
		genero,
		region,
		comuna,
		direccion,
		nivel_estudios,
		nivel_capacitacion,
		num_capacitacion,
		image
	};
	await pool.query('INSERT INTO trabajadores SET ?', [newTrabajador]);
	if (req.file) {
		id_image = await pool.query('SELECT id FROM trabajadores WHERE image = ?', [image]);
		id_image = id_image[0].id;
		image = id_image.toString();
		fs.rename(path.join(__dirname)+'/../image/tei.jpg',path.join(__dirname)+'/../image/tei.jpg'.replace('tei.jpg', image +'.jpg'),function(err) {
		    if (err) {
		    	req.flash('message', 'Formato de imagen incorrecto');
		        res.redirect('/workers/add');
		    }
		});
		await pool.query('UPDATE trabajadores SET image = ? WHERE id = ?', [image, id_image]);
	}
	req.flash('success', 'Agregado satisfactoriamente');
	res.redirect('/workers');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	await pool.query('UPDATE trabajadores SET area = ?, estado = 1 WHERE id = ?', ["Eliminado", id]);
	req.flash('success', 'Trabajador removido satisfactoriamente');
	res.redirect('/workers');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const trabajador = await pool.query('SELECT * FROM trabajadores WHERE id = ?', [id]);
	const areas = await pool.query('SELECT * FROM areas');
	res.render('workers/edit',{trabajador: trabajador[0], areas: areas});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	var { nombre, apellido, rut, fecha_nacimiento, area, correo, telefono, nacionalidad, estado_civil, genero, region, comuna, direccion, nivel_estudios } = req.body;
	nombre = nombre.toUpperCase();
	apellido = apellido.toUpperCase();
	var image;
	if (req.file){
		image = req.params.id;
		fs.rename(path.join(__dirname)+'/../image/undefined.jpg',path.join(__dirname)+'/../image/undefined.jpg'.replace('undefined.jpg', req.params.id+'.jpg'),function(err) {
		    if (err) {
		    	req.flash('message', 'Formato de imagen incorrecto');
		        res.redirect('/workers/edit/'+id);
		    }
		});
	}
	else {
		const validacion = await pool.query("SELECT * FROM trabajadores WHERE image = ?", [id])
		if (validacion[0] == undefined){
			image = 'default';
		}
		else{
			image = id;		
		}
	}
	const newTrabajador = {
		nombre,
		apellido,
		rut,
		fecha_nacimiento,
		area,
		correo,
		telefono,
		nacionalidad,
		estado_civil,
		genero,
		region,
		comuna,
		direccion,
		nivel_estudios,
		image
	};
	await pool.query('UPDATE trabajadores SET ? WHERE id= ?', [newTrabajador, id]);
	req.flash('success', 'Trabajador editado satisfactoriamente');
	res.redirect('/workers/view/'+id);
});

router.get('/search/:search', isLoggedIn, async (req, res) => {
	const areas = await pool.query('SELECT * FROM areas');
	var parametros = req.params.search;
	var parametros = parametros.split('.');
	var search = parametros[0];
	var area = parametros[1];
	var trabajadores;
	if (search != 'none' && area == 'none') {
		search = '%'+search+'%';
		var trabajadores = await pool.query('SELECT * FROM trabajadores WHERE nombre LIKE ? or apellido LIKE ?', [search, search]);
	}
	if (search == 'none' && area != 'none') {
		if (area == 'eliminados'){
			var trabajadores = await pool.query('SELECT * FROM trabajadores WHERE estado = 1');
		}
		else{
			var trabajadores = await pool.query('SELECT * FROM trabajadores WHERE area = ?', [area]);
		}	
	}
	if (search != 'none' && area != 'none') {
		search = '%'+search+'%';
		var trabajadores = await pool.query('SELECT * FROM trabajadores WHERE (nombre LIKE ? or apellido LIKE ?) and area = ?', [search,search,area]);
	}
	for (var i = 0; i<trabajadores.length; i++) {
		var nombre = trabajadores[i].nombre;
		var apellido = trabajadores[i].apellido;
		nombre = nombre.split(' ');
		apellido = apellido.split(' ');
		trabajadores[i].nombre = nombre[0];
		trabajadores[i].apellido = apellido[0];
	}
	res.render('workers/list', {trabajadores: trabajadores, areas: areas});
});

router.post('/search', isLoggedIn, (req, res) => {
	var search = req.body.search;
	var area = req.body.area;
	if (search == '' && area == '') {
		req.flash('message', 'Ingrese parametros de busqueda');
		res.redirect('/workers');
	}
	if (search != '' && area == '') {
		res.redirect('/workers/search/'+search+'.none');
	}
	if (search == '' && area != '') {
		res.redirect('/workers/search/'+'none.'+area);
	}
	if (search != '' && area != '') {
		res.redirect('/workers/search/'+search+'.'+area);
	}
	res.redirect('/workers');
});

router.get('/view/:id', isLoggedIn, async (req, res) => {
	var id = req.params.id;
	var trabajador = await pool.query('SELECT * FROM trabajadores WHERE id = ?', [id]);
	var date = trabajador[0].fecha_nacimiento;
	var date = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
	trabajador[0].fecha_nacimiento = date;
	var descripciones = await pool.query('SELECT * FROM descripciones WHERE id_t = ?', [id]);
	for (var i = 0; i<descripciones.length; i++){
		var dateD = descripciones[i].fecha;
		var dateD = dateD.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
		descripciones[i].fecha = dateD;
	}
	res.render("workers/view", {trabajador: trabajador, descripciones: descripciones});
});

router.post('/view/:id', isLoggedIn, async (req,res) => {
	var id = req.params.id;
	var asunto = req.body.asunto;
	var fecha = req.body.fecha_desc;
	var nDescripcion = req.body.descripcion;
	await pool.query('INSERT INTO descripciones(id_t,asunto,fecha,descripcion) VALUES (?,?,?,?)', [id,asunto,fecha,nDescripcion]);
	res.redirect('/workers/view/'+id);
});

router.get('/graphic', isLoggedIn, async (req, res) => {
	const bas_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Basica Incompleta"');
	const bas_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Basica"');
	const med_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Media Incompleta"');
	const med_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Media"');
	const sup_in = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Superior Incompleta"');
	const sup_com = await pool.query('SELECT count(nivel_estudios) FROM `trabajadores` WHERE nivel_estudios="Superior"');

	//console.log(bas_in);
	//console.log(bas_com);
	//console.log(med_in);
	//console.log(med_com);
	//console.log(sup_in);
	//console.log(sup_com);

	var Capacitaciones = await pool.query('SELECT nombre FROM `areas`');
	var areas = {};
	const sumas_array = {};
	var count = 0;
	for(var i = 0; i < Object.keys(Capacitaciones).length;i++){
		areas[Capacitaciones[i].nombre]= await pool.query('SELECT sum(`nivel_capacitacion`) FROM `trabajadores` where `area` =  "'+Capacitaciones[i].nombre+'";');
	}
	res.render('workers/graphic',{areas:areas,bas_in:bas_in,bas_com:bas_com,med_in:med_in,med_com:med_com,sup_in:sup_in,sup_com:sup_com});
});

module.exports = router;