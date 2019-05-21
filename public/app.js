var myApp = angular.module('myApp', ['ngResource','ui.bootstrap', 'ui.router','angular-growl']);

myApp.config(function ($stateProvider, $urlRouterProvider, growlProvider) {

    // $routeProvider

    //     .when('/', {
    //         templateUrl: 'pages/firstPage.html',
    //         controller: ''
    //     })

    //     .when('/home', {
    //         templateUrl: 'pages/home.html',
    //         controller: 'homeController',
    //         resolve: {
    //             allCities: ['$http', function ($http) {
    //                 return $http({
    //                         method: "GET",
    //                         url: "http://localhost:3000/home",
    //                     })
    //                     .then(function (response) {
    //                         console.log(response.data.cities);
    //                         return response.data.cities;
    //                     }, function (error) {
    //                         console.log(error, 'can not get data.');
    //                     });
    //             }]
    //         }
    //     })

    //     .when('/restaurants/:currentCity', {
    //         templateUrl: 'pages/allrestaurants.html',
    //         controller: 'restaurantController',
    //         resolve: {
    //             allRestaurants: ['$http', '$route', function ($http, $route) {
    //                 var cityName = $route.current.params.currentCity;
    //                 return $http({
    //                         method: "GET",
    //                         url: "http://localhost:3000/allrestaurants/" + cityName,
    //                         data: {
    //                             city: cityName
    //                         }
    //                     })
    //                     .then(function (response) {
    //                         return response.data.restaurants;;
    //                     }, function (error) {
    //                         console.log(error, 'can not get data.');
    //                     });
    //             }]
    //         }

    //     })

    //     .when('/restaurants/:currentCity/:currentRestaurantId', {
    //         templateUrl: 'pages/viewRestaurant.html',
    //         controller: 'viewRestaurantController',
    //         resolve: {
    //             restaurantInfoAndMenu: ['$http', '$route', function ($http, $route) {
    //                 var currentCity = $route.current.params.currentCity;
    //                 var currentRestaurantId = $route.current.params.currentRestaurantId;
    //                 return $http({
    //                         method: "GET",
    //                         url: "http://localhost:3000/allrestaurants/" + currentCity + '/' + currentRestaurantId,
    //                         data: {
    //                             city: currentCity,
    //                             restaurantId: currentRestaurantId
    //                         }
    //                     })
    //                     .then(function (response) {
    //                         var menuRetrieved = (response.data.data);
    //                         var menuList = menuRetrieved.category;
    //                         var subCategory = menuRetrieved.subCategory;
    //                         var foodItems = menuRetrieved.foodItems;

    //                         //mapping1
    //                         for (var i in menuList) {

    //                             var x = subCategory.filter(function (ele) {
    //                                 return menuList[i]._id == ele.categoryId;
    //                             });

    //                             if (x) {
    //                                 menuList[i].subCategory = x;
    //                             }
    //                         }

    //                         //mapping2
    //                         for (var i in menuList) {
    //                             for (var j = 0; j < menuList[i].subCategory.length; j++) {

    //                                 var x = foodItems.filter(function (ele) {
    //                                     return menuList[i].subCategory[j]._id == ele.subCategoryId;
    //                                 });

    //                                 if (x) {
    //                                     menuList[i].subCategory[j].foodItems = x;
    //                                 }

    //                             }

    //                         }

    //                         var result = {};
    //                         result.restaurantInfo = response.data.data.restaurantInfo;
    //                         result.menuList = menuList;
    //                         result.subCategory = subCategory;
    //                         result.foodItems = foodItems;
    //                         //console.log(result);
    //                         return result;
    //                     }, function (error) {
    //                         console.log(error, 'can not get data.');
    //                     });
    //             }]
    //         }

    //     })

    //     .when('/checkout', {
    //         templateUrl: 'pages/checkout.html',
    //         controller: 'checkoutController',
    //         resolve: {
    //             getUserInfo: ['$http', function ($http) {
    //                 var token = localStorage.getItem('userToken');
    //                 return $http({
    //                         method: "POST",
    //                         url: "http://localhost:3000/users/getinfo",
    //                         data: {
    //                             token: token
    //                         }
    //                     })
    //                     .then(function (response) {
    //                         if (response.data.data) {
    //                             console.log(response.data.data.address);
    //                             decodedData = response.data.data;
    //                             console.log(decodedData);
    //                             if (decodedData.length == 0) {
    //                                 growl.info("Please enter a delivery address!", {
    //                                     ttl: 3000
    //                                 });
    //                             }
                                
    //                             // console.log($scope.userAddress);
    //                             return decodedData;
    //                         }

    //                     }, function (error) {
    //                         console.log(error, 'can not get data.');
    //                     });
    //             }]
    //         }


    //     })

    //     .when('/login', {
    //         templateUrl: 'pages/login.html',
    //         controller: 'loginController'
    //     })

    //     .when('/signup', {
    //         templateUrl: 'pages/signup.html',
    //         controller: 'signupController'
    //     })

    //growlProvider.globalTimeToLive(5000);

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('firstPage',{
        url:'/',
        templateUrl: 'pages/firstPage.html',
        controller:''    
    })

    .state('login',{
        url:'/login',
        templateUrl: 'pages/login.html',
        controller:'loginController'    
    })

    .state('signup',{
        url:'/signup',
        templateUrl: 'pages/signup.html',
        controller:'signupController'    
    })

    .state('home',{
        url:'/home',
        templateUrl: 'pages/home.html',
        controller:'homeController',
        resolve: {
            allCities: ['$http', function ($http) {
                return $http({
                        method: "GET",
                        url: "http://localhost:3000/home",
                    })
                    .then(function (response) {
                        console.log(response.data.cities);
                        return response.data.cities;
                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });
            }]
        }   
    })

    .state('allrestaurants',{
        url:'/restaurants/{currentCity}',
        templateUrl: 'allrestaurants.html',
        controller:'restaurantController',
        resolve: {
            allCities: ['$http', function ($http) {
                return $http({
                        method: "GET",
                        url: "http://localhost:3000/home",
                    })
                    .then(function (response) {
                        console.log(response.data.cities);
                        return response.data.cities;
                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });
            }]
        }   
    })

    .state('viewRestaurant',{
        url:'/restaurants/{currentCity}/{currentRestaurantId}',
        templateUrl: 'pages/viewRestaurant.html',
        controller:'viewRestaurantController',
        resolve: {
            restaurantInfoAndMenu: ['$http', '$route', function ($http, $route) {
                var currentCity = $route.current.params.currentCity;
                var currentRestaurantId = $route.current.params.currentRestaurantId;
                return $http({
                        method: "GET",
                        url: "http://localhost:3000/allrestaurants/" + currentCity + '/' + currentRestaurantId,
                        data: {
                            city: currentCity,
                            restaurantId: currentRestaurantId
                        }
                    })
                    .then(function (response) {
                        var menuRetrieved = (response.data.data);
                        var menuList = menuRetrieved.category;
                        var subCategory = menuRetrieved.subCategory;
                        var foodItems = menuRetrieved.foodItems;

                        //mapping1
                        for (var i in menuList) {

                            var x = subCategory.filter(function (ele) {
                                return menuList[i]._id == ele.categoryId;
                            });

                            if (x) {
                                menuList[i].subCategory = x;
                            }
                        }

                        //mapping2
                        for (var i in menuList) {
                            for (var j = 0; j < menuList[i].subCategory.length; j++) {

                                var x = foodItems.filter(function (ele) {
                                    return menuList[i].subCategory[j]._id == ele.subCategoryId;
                                });

                                if (x) {
                                    menuList[i].subCategory[j].foodItems = x;
                                }

                            }

                        }

                        var result = {};
                        result.restaurantInfo = response.data.data.restaurantInfo;
                        result.menuList = menuList;
                        result.subCategory = subCategory;
                        result.foodItems = foodItems;
                        //console.log(result);
                        return result;
                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });
            }]
        }

    })

    .state('checkout',{
        url:'/checkout',
        templateUrl: 'pages/checkout.html',
        controller:'checkoutController',
        resolve: {
            getUserInfo: ['$http', function ($http) {
                var token = localStorage.getItem('userToken');
                return $http({
                        method: "POST",
                        url: "http://localhost:3000/users/getinfo",
                        data: {
                            token: token
                        }
                    })
                    .then(function (response) {
                        if (response.data.data) {
                            console.log(response.data.data.address);
                            decodedData = response.data.data;
                            console.log(decodedData);
                            if (decodedData.length == 0) {
                                growl.info("Please enter a delivery address!", {
                                    ttl: 3000
                                });
                            }
                            
                            // console.log($scope.userAddress);
                            return decodedData;
                        }

                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });
            }]
        }

        
    })




});