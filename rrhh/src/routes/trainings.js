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

router.get('/add', async (req, res) => {
	res.render('trainings/add');
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

module.exports = router;