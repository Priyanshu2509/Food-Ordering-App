myApp.controller('restaurantController', ['$scope', '$http', '$location', '$state', '$stateParams', 'allRestaurants','restaurantService', function ($scope, $http, $location, $state, $stateParams, allRestaurants, restaurantService) {

        console.log("Restraunt Controller");

         
        
         $scope.currentCity = $stateParams.currentCity;
         $scope.restaurantsList = allRestaurants;
        //  console.log($scope.restaurantsList);
     }

]);