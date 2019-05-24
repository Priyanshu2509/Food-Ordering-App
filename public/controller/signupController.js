myApp.controller('signupController', ['$scope', '$http','$state', function($scope, $http, $state){ 
    //console.log($location)
    $scope.user = {};
    $scope.onSignupSubmit = function () {

        $http({
            method: "POST",
            url: "http://localhost:3000/api/users/signup",
            data: $scope.user
        })
        .then(function (response) {
            alert("success");
            console.log(response, 'res');
            data = response.data;
            console.log(data);
            $state.go('home');
        },function (error){
            console.log(error, 'can not get data.');
            $state.go('login');
            // $location.path('/pages/login');
        });
     

    }
    
}]);