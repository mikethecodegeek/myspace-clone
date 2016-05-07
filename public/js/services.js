'use strict';

var app = angular.module('angularApp');

app.service('userService',function($http) {
    this.getAll = () => {
        return $http.get('./api/users');
    };
    this.getProfile = () => {
        return $http.get('./api/users/profile');
    };
    this.register = newPost => {
       // console.log(newPost)
        return $http.post('./api/users/register', {name: newPost.name,
        username: newPost.username, email: newPost.email, password: newPost.password,
        pic: newPost.pic, bio: newPost.bio});
    };
    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };
    this.viewProfile = id => {
        console.log(id.id);
        return $http.get(`./api/users/${id.id}`);
    };
    this.editById = (id, newPost) => {
        console.log(id);
        return $http.put(`./api/users/${id}`, {name: newPost.name,
            username: newPost.username, email: newPost.email,
            pic: newPost.pic, bio: newPost.bio});
    }

    this.login = (user) => {
        console.log('User:', user)
        return $http.post('./api/users/login/', {username: user.username, password: user.password});
    };
    this.logout = () => {
        //console.log('User:', user)
        return $http.post('./api/users/logout/');
    };

   


});
