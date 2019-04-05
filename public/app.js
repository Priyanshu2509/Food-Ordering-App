
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);


myApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/firstPage.html',
        controller: ''
    })

    .when('/home', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/restaurants/:currentCity', {
        templateUrl: 'pages/allrestaurants.html',
        controller: 'restaurantController'
    })

    .when('/restaurants/:currentCity/:currentRestaurantId',{
        templateUrl: 'pages/viewRestaurant.html',
        controller: 'viewRestaurantController'

    })

    .when('/restaurants/:currentCity/:currentRestaurant/checkout',{
        templateUrl: 'pages/checkout.html',
        controller: 'checkoutController'

    })

    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    })

    .when('/signup',{
        templateUrl: 'pages/signup.html',
        controller: 'signupController'
    })

});







