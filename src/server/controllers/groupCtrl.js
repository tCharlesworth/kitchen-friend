var mongoose = require('mongoose'),
    Group = mongoose.model('Group'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe'),
    GroupRecipe = mongoose.model('GroupRecipe');

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
            .populate('administrators members recipes comments.user')
            .populate('recipes.submitter recipes.favorited')
            .exec(function(err, groupData) {
                if(err) {
                    handleError(err, res);
                } else {
                    res.json(groupData);
                }
            });
    },
    
    destroyGroup: function(req, res) {
        if(!req.query.groupId) {
            return res.status(400).json({reason: 'Missing required fields'});
        }
        // Remove the group
        Group.findByIdAndRemove(req.query.groupId, function(removeErr, removeResult) {
            if(removeErr) {
                handleError(removeErr, res);
            } else {
                console.log('Removed the group: ', removeResult);
                // get all the members and remove the group from their lists
                var ids = [];
                for(var i = 0; i < removeResult.members.length; i++) {
                    ids.push(removeResult.members[i]);
                }
                for(var i = 0; i < removeResult.administrators.length; i++) {
                    ids.push(removeResult.administrators[i]);
                }
                var success = 0;
                var errors = 0;
                for(var i = 0; i < ids.length; i++) {
                    User.findByIdAndUpdate(ids[i], {'$pull': {'groups': req.query.groupId}}, function(updErr, updResult) {
                        if(updErr) {
                            errors++;
                        } else {
                            success++;
                        }
                        if(errors+success >= ids.length) {
                            console.log('done updating all members with '+success+' successful updates and '+errors+' errors.');
                            res.send();
                        }
                    });
                }
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
        //First get the recipe info
        Recipe.findById(recipe, function(err, findResult) {
            if(err) {
                handleError(err, res);
            } else {
                // build the new recipe object
                var newGroupRecipe = {
                    name: findResult.name,
                    description: findResult.description,
                    directions: findResult.directions,
                    ingredients: findResult.ingredients,
                    picture: findResult.picture,
                    prepTime: findResult.prepTime,
                    cookTime: findResult.cookTime,
                    submitter: req.user._id,
                    submitterName: req.user.username,
                    saved: 0,
                    favorited: [],
                    comments: []
                };
                GroupRecipe.create(newGroupRecipe, function(err, createResult) {
                    if(err) {
                        handleError(err, res);
                    } else {
                        //Add id to the group recipes
                        Group.findByIdAndUpdate(group, {'$push': {'recipes': createResult._id}}, function(err, result) {
                            if(err) {
                                handleError(err, res);
                            } else {
                                res.json(result);
                            }
                        });
                    }
                });
            }
        });
    },
    
    getRecipeById: function(req, res) {
        var recipe = req.query.recipeId;
        if(!recipe) {
            return res.status(400).json({reason: 'Expected a recipe id but did not find one'});
        }
        GroupRecipe.findOne({'_id': recipe}, function(findErr, result) {
            if(findErr) {
                handleError(findErr, res);
            } else if (!result) {
                return res.status(400).json({reason: 'Invalid recipe id.'});
            } else {
                return res.json(result);
            }
        });
    },
    
    addRecipeComment: function(req, res) {
        var recipe = req.body.recipeId;
        var text = req.body.comment;
        if(!recipe || !text) {
            return res.status(400).json({reason: 'Missing required fields.'});
        }
        var newComment = {
            user: req.user._id,
            username: req.user.username,
            message: text,
            date: Date.now()
        };
        GroupRecipe.findByIdAndUpdate(recipe, {'$push': {'comments': newComment}}, function(err, result) {
            if(err) {
                handleError(err, res);
            } else {
                res.json(result);
            }
        });
    },
    
    leaveGroup: function(req, res) {
        var group = req.query.groupId;
        if(!group) {
            return res.status(400).json({reason: 'Missing required fields'});
        }
        // Update the group
        Group.findByIdAndUpdate(group, {'$pull': {'members': req.user._id, 'administrators': req.user._id}}, function(updErr, updResult) {
            if(updErr) {
                handleError(updErr, res);
            } else {
                // Update the user
                User.findByIdAndUpdate(req.user._id, {'$pull': {'groups': group}}, function(uErr, uResult) {
                    if(uErr) {
                        handleError(uErr, res);
                    } else {
                        res.json(uResult);
                    }
                });
            }
        });
    }
};

function handleError(err, res) {
    console.error('Group error: ', err);
    res.status(500).send();
};