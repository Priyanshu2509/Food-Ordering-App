myApp.controller('indexController', ['$scope', '$location', 'indexService', function ($scope, $location, indexService) {
    $scope.logoutButtonDiv = false;
    // console.log("sdkchkds");
    
    indexService.logoutButtonFunction();
    

}]);