myApp.controller('homeController', ['$scope', '$routeParams', '$location', '$http', 'appService', function($scope, $routeParams, $location, $http, appService) {
$scope.cities=null;
    $http({
        method: "GET",
        url: "http://localhost:3000/home",
        
    })
    .then(function (response) {
        console.log(response, 'res');
        $scope.cities= response.data.cities;
        console.log($scope.cities);
        
    },function (error){
        console.log(error, 'can not get data.');
        //$location.path('/pages/login');
    });


    //$scope.database=appService.data;
    $scope.city='';
    $scope.changedValue = function(item) { 
        appService.currentCity=item; 
        //console.log(item);
        $routeParams.currentCity=appService.currentCity; 
        console.log("current city: ", appService.currentCity);
    } 
        
}]);