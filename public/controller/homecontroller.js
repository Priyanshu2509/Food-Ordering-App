myApp.controller('homeController', ['$scope', '$routeParams', '$location', '$http', 'growl', 'homeService', function ($scope, $routeParams, $location, $http, growl, homeService) {

    var isToken = (localStorage.getItem('userToken'));
    console.log(isToken);
    if(isToken){
        console.log("hello");
        $scope.logoutButtonDiv = true;
    } 


      //fucntion to set routeparams for selected city
    $scope.changedValue = function (item) {
        console.log(item);
        $scope.cityName=$routeParams.currentCity = item;
        localStorage.setItem('currentCity', JSON.stringify(item));
        console.log($scope.cityName);
    }

    var obj=homeService.getCity();
    
    obj.then(function(response){
        console.log(response, 'res');
        $scope.cities = response.data.cities;
        console.log($scope.cities);
        //console.log($scope.cityName);
        
    },
    function(error){
        console.log(error, 'can not get data.');
        //$location.path('/pages/login');

    });
    $scope.validateForm = function () {
        console.log($scope.cityName);
        if (!$scope.cityName) {
            growl.error("Please enter a city name!", {
                ttl: 3000
            });
        }else{
            console.log($scope.cityName);
            $location.path('/restaurants/'+$scope.cityName);
        }
    }


}]);