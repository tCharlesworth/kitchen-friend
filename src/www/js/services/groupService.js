angular.module('kitchenFriend')
.service('groupService', function($http) {
    this.create = function(group) {
        return $http({
            method: 'POST',
            url: '/api/groups',
            data: group
        }).then(simpleReturn, simpleError);
    };
    
    this.getMyGroups = function() {
        return $http({
            method: 'GET',
            url: '/api/myGroups'
        }).then(simpleReturn, simpleReturn);
    };
    
    this.getGroupById = function(groupId) {
        return $http({
            method: 'GET',
            url: '/api/groups/'+groupId
        }).then(simpleReturn, simpleError);
    };
    
    this.getGroupMembers = function(groupId) {
        return $http({
            method: 'GET',
            url: '/api/groupMembers/'+groupId
        }).then(simpleReturn, simpleError);
    };
    
    this.inviteMember = function(name, group) {
        return $http({
            method: 'POST',
            url: '/api/groupMembers',
            data: {
                name: name,
                group: group
            }
        }).then(simpleReturn);
    };
    
    this.makeMemberAdmin = function(memberId, groupId) {
        return $http({
            method: 'PUT',
            url: '/api/groupMembers?memberId='+memberId+'&groupId='+groupId,
        }).then(simpleReturn, simpleError);
    };
    
    this.getGroupInvites = function() {
        return $http({
            method: 'GET',
            url: '/api/groupInvites',
        }).then(simpleReturn, simpleError);
    };
    
    this.acceptGroupInvite = function(groupId) {
        return $http({
            method: 'PUT',
            url: '/api/groupInvites/accept'+'?groupId='+groupId
        });
    };
    
    this.rejectGroupInvite = function(groupId) {
        return $http({
            method: 'PUT',
            url: '/api/groupInvites/reject'+'?groupId='+groupId
        });
    };
    
    this.getRecipeById = function(recipeId) {
        return $http({
            method: 'GET',
            url: '/api/groupRecipes?recipeId='+recipeId
        }).then(simpleReturn, simpleError);
    };
    
    this.addRecipeComment = function(comment, recipeId) {
        return $http({
            method: 'POST',
            url: '/api/groupRecipeComments',
            data: {
                recipeId: recipeId,
                comment: comment
            }
        }).then(simpleReturn, simpleError);
    };
    
    this.destroyGroup = function(groupId) {
        return $http({
            method: 'DELETE',
            url: '/api/groups?groupId='+groupId
        }).then(simpleReturn, simpleError);
    };
    
    this.leaveGroup = function(groupId) {
        return $http({
            method: 'PUT',
            url: '/api/leaveGroup?groupId='+groupId
        }).then(simpleReturn, simpleError);
    };
    
    function simpleReturn(result) {
        return result.data;
    };
    
    function simpleError(err) {
        console.error('Group Service', err);
        return err;
    };
});