var donorModel = require('../models/donorModel.js');

/**
 * donorController.js
 *
 * @description :: Server-side logic for managing donors.
 */
module.exports = {

    /**
     * donorController.list()
     */
    list: function(req, res) {
        donorModel.find(function(err, donors){
            if(err) {
                return res.json(500, {
                    message: 'Error getting donor.'
                });
            }
            return res.json(donors);
        });
    },
    
    getNearBy:function (req, res) {
        
    },

    /**
     * donorController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        donorModel.findOne({_id: id}, function(err, donor){
            if(err) {
                return res.json(500, {
                    message: 'Error getting donor.'
                });
            }
            if(!donor) {
                return res.json(404, {
                    message: 'No such donor'
                });
            }
            return res.json(donor);
        });
    },

    /**
     * donorController.create()
     */
    create: function(req, res) {
        var donor = new donorModel({
			name : req.body.name,
			lastname : req.body.lastname,
			location : req.body.location,
			bloodtype : req.body.bloodtype
        });
        
        console.log(donor);

        donor.save(function(err, donor){
            if(err) {
                return res.status(500).json({
                    message: 'Error saving donor',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: donor._id
            });
        });
    },

    /**
     * donorController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        donorModel.findOne({_id: id}, function(err, donor){
            if(err) {
                return res.json(500, {
                    message: 'Error saving donor',
                    error: err
                });
            }
            if(!donor) {
                return res.json(404, {
                    message: 'No such donor'
                });
            }

            donor.name =  req.body.name ? req.body.name : donor.name;
			donor.lastname =  req.body.lastname ? req.body.lastname : donor.lastname;
			donor.location =  req.body.location ? req.body.location : donor.location;
			donor.bloodtype =  req.body.bloodtype ? req.body.bloodtype : donor.bloodtype;
			
            donor.save(function(err, donor){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting donor.'
                    });
                }
                if(!donor) {
                    return res.json(404, {
                        message: 'No such donor'
                    });
                }
                return res.json(donor);
            });
        });
    },

    /**
     * donorController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        donorModel.findByIdAndRemove(id, function(err, donor){
            if(err) {
                return res.json(500, {
                    message: 'Error getting donor.'
                });
            }
            return res.json(donor);
        });
    }
};