var mongoose = require('mongoose'),
    Group = mongoose.model('Group'),
    User = mongoose.model('User');

module.exports = {
    createGroup: function(req, res) {
        var newGroup = req.body;
        newGroup.administrators = [
            req.user._id
        ];
        Group.create(newGroup, function(err, result) {
            if(err) {
                handleError(err, res);
            } else {
                // Now add the group to the user
                User.findByIdAndUpdate(req.user._id, {'$push': {'groups': result._id}}, function(err, result2) {
                    if(err) {
                        handleError(err, res);
                    } else {
                        return res.json(result);
                    }
                });
            }
        });
    },
    
    getMyGroups: function(req, res) {
        User.findOne({'_id': req.user._id})
            .populate('groups')
            .exec(function(err, user) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(user);
                }
            });
    },
    
    getById: function(req, res) {
        Group.findOne({'_id': req.params.groupId})
            .populate('administrators members recipes')
            .exec(function(err, groupData) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(groupData);
                }
            });
    },
    
    getMembers: function(req, res) {
        Group.findOne({'_id': req.params.groupId})
            .populate('members administrators')
            .exec(function(err, groupData) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(groupData);
                }
            });
    },
    
    inviteNewGroupMember: function(req, res) {
        var group = req.body.group;
        var member = req.body.name;
        if(!group) {
            res.status(400).json({reason: 'Group not specified'});
        } else  if (!member) {
            res.status(400).json({reason: 'Member not specified'});
        } else {
            User.findOne({'username': req.body.name}, function(err, user) {
                if(err) {
                    handleError(err, res);
                } else if (user) {
                    // found that user
                    var newInvite = {
                        groupId: group,
                        invitedBy: req.user._id,
                        dateInvited: Date.now()
                    }
                    User.findByIdAndUpdate(user._id, {'$push': {'groupInvites': newInvite}}, function(err, user2) {
                        if(err) {
                            handleError(err, res);
                        } else {
                            res.json(user2);
                        }
                    });
                } else {
                    res.status(400).json({reason: 'User not found'});
                }
            });
        }
    },
    
    makeGroupMemberAdmin: function(req, res) {
        var member = req.params.memberId;
        var group = req.params.groupId;
        if(!group) {
            res.status(400).json({reason: 'Group not specified'});
        } else if(!member) {
            res.status(400).json({reason: 'Member not specified'});
        } else {
            Group.findByIdAndUpdate(group, {'$pull': {'members': member}, '$push': {'administrators': member}}, function(err, group) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(group);
                }
            });
        }
    },

    getInvites: function(req, res) {
        User.findOne({'_id': req.user._id})
            .populate('groupInvites.groupId groupInvites.invitedBy')
            .exec(function(findErr, user) {
            if(findErr) {
                handleError(findErr, res);
            } else {
                res.json(user.groupInvites)
            }
        });
    },
    
    acceptInvite: function(req, res) {
        var groupId = req.query.groupId;
        console.log('accepting');
        User.findByIdAndUpdate(req.user._id, {'$pull': {'groupInvites': {'groupId': groupId}}}, function(err, result) {
            if(err) {
                handleError(err, res);
            } else {
                console.log('pulled id?');
                User.findByIdAndUpdate(req.user._id, {'$push': {'groups': groupId}}, function(err, result2) {
                    if(err) {
                        handleError(err, res);
                    } else {
                        console.log('added to groups')
                        // update the group
                        Group.findByIdAndUpdate(groupId, {'$push': {'members': req.user._id}}, function(err, result3) {
                            if(err) {
                                handleError(err, res);
                            } else {
                                console.log('group updated');
                                res.json(result2);
                            }
                        });
                    }
                });
            }
        });
    },
    
    rejectInvite: function(req, res) {
        var groupId = req.query.groupId;
        console.log('rejecting');
        User.findByIdAndUpdate(req.user._id, {'$pull': {'groupInvites': {'groupId': groupId}}}, function(err, result) {
            if(err) {
                handleError(err, res);
            } else {
                console.log('rejected');
                res.json(result);
            }
        });
    },
    
    addRecipe: function(req, res) {
        var group = req.query.groupId;
        var recipe = req.query.recipeId;
        if(!group || !recipe) {
            return  res.status(400).json({reason: 'Missing required fields. (GroupId or RecipeId not found)'});
        } 
        Group.findByIdAndUpdate(group, {'$push': {'recipes': recipe}}, function(err, result) {
            if(err) {
                handleError(err, res);
            } else {
                res.json(result);
            }
        });
    }
};

function handleError(err, res) {
    console.error('Group error: ', err);
    res.status(500).send();
};