var constants = require('../business/constants');

var bo_controls = {};

bo_controls.save_control = function(req, res) {
	var db = req.db;
    db.collection(constants.MDB_COLLECTION_NAMES.CONTROLLS).insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
};

bo_controls.get_controllers_by_id_user = function(req, res) {
	var db = req.db;
    var userToDelete = req.params.id;
    db.collection(constants.MDB_COLLECTION_NAMES.CONTROLLS).removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
};

module.exports = bo_controls;
