myApp.controller('loginController', ['$scope', '$http', '$location', function($scope, $http, $location){ 
    
    // $scope.user = {};
    // $scope.onLoginSubmit = function () {
        
    //     $http({
    //         method: "POST",
    //         url: "http://localhost:3000/api/users/authenticate",
    //         data: $scope.user
    //     })
    //     .then(function (response) {
    //         console.log(response, 'res');
    //         data = response.data;
    //         console.log(data);
            
    //         $location.path('/home');
    //     },function (error){
    //         console.log(error, 'can not get data.');
    //         $location.path('/login');
    //     });
    // }

    // $scope.onSignupSubmit = function () {

    //     $http({
    //         method: "POST",
    //         url: "http://localhost:3000/api/users/signup",
    //         data: $scope.user
    //     })
    //     .then(function (response) {
    //         alert("success");
    //         console.log(response, 'res');
    //         data = response.data;
    //         console.log(data);
    //         $location.path('/pages/home');
    //     },function (error){
    //         console.log(error, 'can not get data.');
    //         $location.path('/pages/login');
    //     });
     

    // }
    
}]);