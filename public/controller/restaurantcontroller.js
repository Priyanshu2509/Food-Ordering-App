myApp.controller('restaurantController', ['$scope', '$routeParams', '$http', '$location', 'restaurantService',
    function ($scope, $routeParams, $http, $location, restaurantService) {

        $scope.currentCity = JSON.parse(localStorage.getItem('currentCity'));
        $routeParams.currentCity = $scope.currentCity
        // $scope.currentCity=$routeParams.currentCity;
        // //console.log($routeParams.currentCity);

        var obj = restaurantService.getRestaurantsByCity($scope.currentCity);

        obj.then(function (response) {
                console.log(response, 'res');
                $scope.restaurantsList = response.data.restaurants;
                //localStorage.setItem('restaurantsList',JSON.stringiy(response.data.restaurants));
                console.log ($scope.restaurantsList);
                $location.path('/restaurants/' + $scope.currentCity);
            },
            function (error) {
                console.log(error, 'can not get data.');
                $location.path('/home');

            });
        }

]);