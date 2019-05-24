myApp.controller('indexController', ['$scope', '$location', 'indexService', function ($scope, $location, indexService) {

    var isToken = (localStorage.getItem('userToken'));
    $scope.logoutButtonDiv = false;
    
    if(isToken){
        $scope.logoutButtonDiv = true;
        
    }

    $scope.logoutFunction = function () {
        localStorage.clear();
        $location.path('/login');
    }

}]);