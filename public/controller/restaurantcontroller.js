myApp.controller('restaurantController', ['$scope', '$routeParams', '$http', '$location', 'restaurantService', 'allRestaurants', function ($scope, $routeParams, $http, $location, restaurantService, allRestaurants) {

        $scope.currentCity = $routeParams.currentCity;
        console.log($routeParams.currentCity);

        $scope.restaurantsList = allRestaurants;
        console.log($scope.restaurantsList);
     }

]);