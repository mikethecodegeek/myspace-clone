'use strict';

var app = angular.module('angularApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('browse', {
            url: '/browse/',
            templateUrl: '/html/browseusers.html',
            controller: 'browseCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: '/html/login.html',
            controller: 'loginCtrl'
        })
        .state('myprofile', {
            url: '/myprofile/',
            templateUrl: '/html/profile.html',
            controller: 'profileCtrl'
        })
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('editprofile', {
            url: '/profile/edit',
            templateUrl: '/html/editprofile.html',
            controller: 'editCtrl'
        })
        .state('users/profiles/', {
            url: '/users/view/profiles/:id',
            templateUrl: '/html/userprofile.html',
            controller: 'viewprofileCtrl'
        })
       


    $urlRouterProvider.otherwise('/');

})
