myApp.controller('restaurantController', ['$scope','$routeParams', '$http', '$location','appService',  
 function($scope,$routeParams, $http, $location, appService) {

    $routeParams.currentCity=appService.currentCity; 
    $scope.currentCity=appService.currentCity;
    console.log($scope.currentCity);

    $http({
        method: "GET",
        url: "http://localhost:3000/allrestaurants/" + $scope.currentCity,
        data:{
            city: appService.currentCity
        }
    })
    .then(function (response) {
        console.log(response, 'res');
        $scope.restaurantsList= response.data.restaurants;
        console.log($scope.restaurantsList);
        $location.path('/restaurants/'+ $scope.currentCity);
    },function (error){
        console.log(error, 'can not get data.');
        $location.path('/home');
    });
    

}]);