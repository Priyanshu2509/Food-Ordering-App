myApp.controller('homeController', ['$scope', '$routeParams', '$location', '$http', 'growl', 'homeService', 'navbarService', 'allCities', function ($scope, $routeParams, $location, $http, growl, homeService, navbarService, allCities) {
    // location.reload();
    $scope.logoutButtonDiv = navbarService.checkLogoutButton();
    
    console.log($scope.logoutButtonDiv);

    $scope.cities=allCities;
    console.log(allCities);

    $scope.selected = undefined;
    $scope.selected = '';
    $scope.formatInputField = function (selected) {
        //console.log(food);
        return $scope.selected ? selected : '';

    }

    $scope.clearData = function () {
        $scope.selected = '';
    }

    //function to set routeparams for selected city
    $scope.changedValue = function (item) {
        $scope.cityName  = item;
    }

    //validate search option for cities
    $scope.validateForm = function () {
        console.log($scope.cityName);
        if (!$scope.cityName) {
            growl.error("Please enter a city name!", {
                ttl: 3000
            });
                
        } else {
            console.log($scope.cityName);
            $routeParams.currentCity=$scope.cityName;
            $location.path('/restaurants/' + $scope.cityName);
        }
    }

}]);