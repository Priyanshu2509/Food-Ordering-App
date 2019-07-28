myApp.controller('navbarController', ['$scope', '$location', 'navbarService', function ($scope, $location, navbarService) {

   // console.log('Here at Navbar controller');
   var isToken = (localStorage.getItem('userToken'));
   $scope.logoutButtonDiv = false;

   if (isToken) {
      $scope.logoutButtonDiv = navbarService.checkLogoutButton();
      if (!$scope.$$phase) {
         $scope.$apply();
      }
       
   }

   $scope.logoutFunction = function () {
      navbarService.logoutFunction();
   }

}]);