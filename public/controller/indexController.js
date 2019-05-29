myApp.controller('indexController', ['$scope', '$state', 'indexService', function ($scope, $state, indexService) {

    var isToken = (localStorage.getItem('userToken'));
    $scope.logoutButtonDiv = false;
    
    if(isToken){
        $scope.logoutButtonDiv = true; 
    }

    $scope.logoutFunction = function () {
        localStorage.clear();
        $state.go('login');  
    }

}]);