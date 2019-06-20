const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

Date.prototype.format = function(fstr, utc) {
	  var that = this;
	  utc = utc ? 'getUTC' : 'get';
	  return fstr.replace (/%[YmdHMS]/g, function (m) {
	    switch (m) {
	    case '%Y': return that[utc + 'FullYear'] ();
	    case '%m': m = 1 + that[utc + 'Month'] (); break;
	    case '%d': m = that[utc + 'Date'] (); break;
	    case '%H': m = that[utc + 'Hours'] (); break;
	    case '%M': m = that[utc + 'Minutes'] (); break;
	    case '%S': m = that[utc + 'Seconds'] (); break;
	    default: return m.slice (1); 
	    }    
	    return ('0' + m).slice (-2);
	  });
	};

router.get('/', isLoggedIn, async (req, res) => {
	const capacitaciones = await pool.query('SELECT * FROM capacitaciones ORDER BY fecha DESC');
	const areas = await pool.query('SELECT * FROM areas');
	for (var i=0; i<capacitaciones.length; i++){
		var aux = capacitaciones[i].fecha.format("%d-%m-%Y");
		capacitaciones[i].fecha = aux;
	}
	res.render('trainings/list', { capacitaciones: capacitaciones, areas: areas});
});

router.get('/add', isLoggedIn, async (req, res) => {
	var areas = await pool.query('SELECT * FROM areas');
	res.render('trainings/add', {areas: areas});
});

router.post('/add', isLoggedIn, async (req, res) => {
	var { nombre, fecha, descripcion, area} = req.body;
	const newCap = {
		nombre,
		fecha,
		descripcion,
		area
	};
	await pool.query('INSERT INTO capacitaciones SET ?', [newCap]);
	res.redirect('/trainings');
});

router.post('/add', isLoggedIn, async (req, res) => {
	var { nombre, fecha, descripcion, area} = req.body;
	const newCap = {
		nombre,
		fecha,
		descripcion,
		area
	};
	await pool.query('INSERT INTO capacitaciones SET ?', [newCap]);
	res.redirect('/trainings');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
	var { id } = req.params;
	var estados = await pool.query('SELECT * FROM estado WHERE id_c = ?', [id]);
	for(var i=0; i<estados.length; i++){
		var trabajador = await pool.query('SELECT num_capacitacion FROM trabajadores WHERE id = ?', [estados[i].id_t]);
		var resta = trabajador[0].num_capacitacion;
		resta = resta-1;
		await pool.query('UPDATE trabajadores SET num_capacitacion = ? WHERE id = ?', [resta, estados[i].id_t]);
		await pool.query('DELETE FROM estado WHERE id_t = ? and id_c = ?',[estados[i].id_t, estados[i].id_c]);
	}
	await pool.query('DELETE FROM capacitaciones WHERE id = ?', [id]);
	res.redirect('/trainings');
});

router.get('/view/:id', isLoggedIn, async (req, res) => {
	var id = req.params.id;
	var capacitacion = await pool.query('SELECT * FROM capacitaciones WHERE id = ?', [id]);
	var aux = capacitacion[0].fecha.format("%d-%m-%Y");
	capacitacion[0].fecha = aux;
	var area = capacitacion[0].area;
	var trabajadores = await pool.query('SELECT * FROM trabajadores WHERE area = ?', [area]);
	for(var i = 0; i<trabajadores.length; i++){
		var id_t = trabajadores[i].id;
		var estado = await pool.query('SELECT * FROM estado WHERE id_c = ? and id_t =?', [id, id_t]);
		if(estado[0] != null){
			trabajadores[i]['agregar']=null;
			trabajadores[i]['eliminar']="enabled";
		}
		else{
			trabajadores[i]['agregar']="enabled";
			trabajadores[i]['eliminar']="disabled";
		}
		trabajadores[i]['link']=id_t+"."+id;
	}
	res.render('trainings/view', { capacitacion: capacitacion, trabajadores: trabajadores });
});

router.get('/search/:search', isLoggedIn, async (req, res) => {
	const areas = await pool.query('SELECT * FROM areas');
	var parametros = req.params.search;
	var parametros = parametros.split('.');
	var search = parametros[0];
	var area = parametros[1];
	var capacitaciones;
	if (search != 'none' && area == 'none') {
		search = '%'+search+'%';
		var capacitaciones = await pool.query('SELECT * FROM capacitaciones WHERE nombre LIKE ?', [search]);
	}
	if (search == 'none' && area != 'none') {
		var capacitaciones = await pool.query('SELECT * FROM capacitaciones WHERE area = ?', [area]);
	}
	if (search != 'none' && area != 'none') {
		search = '%'+search+'%';
		var capacitaciones = await pool.query('SELECT * FROM capacitaciones WHERE nombre LIKE ? and area = ?', [search,area]);
	}
	for (var i=0; i<capacitaciones.length; i++){
		var aux = capacitaciones[i].fecha.format("%d-%m-%Y");
		capacitaciones[i].fecha = aux;
	}
	res.render('trainings/list', {capacitaciones: capacitaciones, areas: areas});
});

router.post('/search', isLoggedIn, (req, res) => {
	var search = req.body.search;
	var area = req.body.area;
	if (search == '' && area == '') {
		req.flash('message', 'Ingrese parametros de busqueda');
		res.redirect('/trainings');
	}
	if (search != '' && area == '') {
		res.redirect('/trainings/search/'+search+'.none');
	}
	if (search == '' && area != '') {
		res.redirect('/trainings/search/'+'none.'+area);
	}
	if (search != '' && area != '') {
		res.redirect('/trainings/search/'+search+'.'+area);
	}
	res.redirect('/trainings');
});

router.post('/view/add/:data', isLoggedIn, async (req, res) => {
	var data = req.params.data;
	var data = data.split('.');
	var id_t = data[0];
	var id_c = data[1];
	const newUC = {
		id_t,
		id_c
	};
	await pool.query('INSERT INTO estado SET ?', [newUC]);
	trabajador = await pool.query('SELECT num_capacitacion FROM trabajadores WHERE id = ?', [id_t]);
	var suma = trabajador[0].num_capacitacion;
	suma = suma + 1;
	await pool.query('UPDATE trabajadores SET num_capacitacion = ? WHERE id = ?', [suma, id_t]);
	res.redirect('/trainings/view/'+id_c);
});

router.post('/view/delete/:data', isLoggedIn, async (req, res) => {
	var data = req.params.data;
	var data = data.split('.');
	var id_t = data[0];
	var id_c = data[1];
	trabajador = await pool.query('SELECT num_capacitacion FROM trabajadores WHERE id = ?', [id_t]);
	var resta = trabajador[0].num_capacitacion;
	resta = resta - 1;
	await pool.query('DELETE FROM estado WHERE id_t = ? and id_c = ?', [id_t, id_c]);
	await pool.query('UPDATE trabajadores SET num_capacitacion = ? WHERE id = ?', [resta, id_t]);
	res.redirect('/trainings/view/'+id_c);
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	var id = req.params.id;
	var capacitacion = await pool.query('SELECT * FROM capacitaciones WHERE id = ?', [id]);
	var aux = capacitacion[0].fecha.format("%Y-%m-%d");
	capacitacion[0].fecha = aux;
	res.render('trainings/edit', {capacitacion: capacitacion});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	var id = req.params.id;
	var nombre = req.body.nombre;
	var descripcion = req.body.descripcion;
	var fecha = req.body.fecha;
	await pool.query('UPDATE capacitaciones SET nombre = ?, descripcion = ?, fecha = ? WHERE id = ?', [nombre, descripcion, fecha, id]);
	res.redirect('/trainings/view/'+id);
});

module.exports = router;