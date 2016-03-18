angular.module('kitchenFriend')
    .controller('groupAdminCtrl', function($scope, $stateParams, $state, groupService) {
        groupService.getGroupById($stateParams.groupId).then(function(group) {
            $scope.group = group;
            console.log('got group', group);
        });
        
        $scope.addMember = function(name) {
            console.log("ADD", name);
            groupService.inviteMember(name, $scope.group._id)
                .then(function(response) {
                    window.alert('Member Invited');
                }).catch(function(err) {
                    console.error('invite err: ', err);
                    window.alert('error: ', err.data.reason);
                });
            $scope.toInvite = '';
            $scope.showMemberInvite = false;
        };
        
        $scope.makeAdmin = function(memberId, index) {
            groupService.makeMemberAdmin(memberId, $scope.group._id)
                .then(function(response) {
                    var member = $scope.group.members.splice(index, 1)
                    $scope.group.administrators.push(member);
                });
        };
        
        $scope.destroyGroup = function() {
            if(window.confirm('Are you sure you want to destroy this group?')) {
                groupService.destroyGroup($stateParams.groupId).then(function(result) {
                    window.alert('Group has been destroyed');
                    $state.go('Group.Dashboard');
                });
            }
        };
    });