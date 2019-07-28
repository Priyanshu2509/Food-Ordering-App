myApp.controller('homeController', ['$scope',  '$location', '$http', 'growl', '$state', '$stateParams' , 'navbarService', 'allCities', function ($scope, $location, $http, growl, $state, $stateParams,  navbarService, allCities) {
    // location.reload();
    $scope.logoutButtonDiv = navbarService.checkLogoutButton();
    
    // console.log($scope.logoutButtonDiv);

    $scope.cities=allCities;
    //  console.log(allCities);

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
        // console.log($scope.cityName);
        if (!$scope.cityName) {
            alert('Please enter a city name!');
        } else {
                
            $stateParams.currentCity=$scope.cityName;
            $state.go('allrestaurants', { currentCity : $scope.cityName});
            
        }
    }

}]);