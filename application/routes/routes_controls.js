var express = require('express');
var bo_controls = require('../business/bo_controls');

var routerControlls = express.Router();

routerControlls.get('/create_control', function(req, res) {
	res.render('controls/create_control', {title: 'Add a control', tabAddControlActive : 'active'});
});

routerControlls.post('save_control', bo_controls.save_control);
routerControlls.get('get_controls', bo_controls.get_controllers_by_id_user);

module.exports = routerControlls;
