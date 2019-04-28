myApp.controller('signupController', ['$scope', '$http','$location', function($scope, $http, $location, appService){ 
    //console.log($location)
    $scope.user = {};
    $scope.onSignupSubmit = function () {

        $http({
            method: "POST",
            url: "http://localhost:3000/users/signup",
            data: $scope.user
        })
        .then(function (response) {
            alert("success");
            console.log(response, 'res');
            data = response.data;
            console.log(data);
            $location.path('/pages/home');
        },function (error){
            console.log(error, 'can not get data.');
            $location.path('/pages/login');
        });
     

    }
    
}]);