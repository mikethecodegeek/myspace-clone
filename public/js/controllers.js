'use strict';
var app = angular.module('angularApp');

app.controller('homeCtrl', function(userService, $scope, $state) {
    
    $scope.loggedin = false;


    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
            $scope.loggedin = true;
          //  console.log($scope.loggedin)
        });
    $scope.logout = function () {
        userService.logout()
            .then(stuff => {
               $scope.loggedin = false;
                $state.go('home');
            });
    }





});

app.controller('browseCtrl', function(userService, $scope, $state) {
    userService.getAll()
        .then(stuff => {
            $scope.apiData = stuff;
           // console.log($scope.apiData)
        });
    
    $scope.viewProfile = function(friend) {
     //   console.log(friend);
    }

});

app.controller('loginCtrl', function(userService, $scope, $state) {
    $scope.login = function() {
        var thisuser = {
            username: $scope.username,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (stuff) => {
             //   console.log(stuff);
                $state.go('myprofile')
            });
    }


});
app.controller('profileCtrl', function(userService, $scope, $state) {
    console.log('Profiles');
    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
         //   console.log($scope.apiData)
        });

});
app.controller('registerCtrl', function(userService, $scope, $state) {
    $scope.register = function() {
        var thisuser = {
            name: $scope.newName,
            email: $scope.newEmail,
            username: $scope.newUsername,
            password: $scope.newPassword,
            pic: $scope.newPicture,
            bio: $scope.newBio
        };
        userService.register(thisuser)
            .then(
                $state.go('home')

        )
    }
   

});

app.controller('editCtrl', function(userService, $scope, $state) {
    userService.getProfile()
        .then(stuff => {
            $scope.apiData = stuff;
            $scope.editName = stuff.data.name;
            $scope.editUsername = stuff.data.username;
            $scope.editPicture = stuff.data.pic;
            $scope.editBio = stuff.data.username;
        });

    $scope.editUser = function() {
        var thisuser = {
            name: $scope.editName,
            username: $scope.editUsername,
            email: $scope.editEmail,
            pic: $scope.editPicture,
            bio: $scope.editBio
        };
        userService.editById($scope.apiData.data._id, thisuser)
            .then(stuff => {
                $scope.apiData = stuff;
                $state.go('myprofile')
                //   console.log($scope.apiData)
            });
    }

});

app.controller('viewprofileCtrl', function(userService, $scope, $state) {

    userService.viewProfile($state.params)
        .then(stuff => {
            $scope.apiData = stuff;
            console.log($scope.apiData)
            if ($scope.apiData.status === 200) {
                $scope.loggedin = true;
            }
        });

});

    
