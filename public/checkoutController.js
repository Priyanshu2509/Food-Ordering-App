myApp.controller('viewRestaurantController',['$scope', '$routeParams', 'appService',
function($scope, $routeParams, appService) {

$scope.cart=appService.cart;
}]);


