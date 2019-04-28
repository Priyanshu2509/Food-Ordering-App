myApp.controller('loginController', ['$scope', '$http', '$location', 'growl', 'loginService', function ($scope, $http, $location, growl, loginService) {

    $scope.user = {};
    var data = [];
    $scope.onLoginSubmit = function () {

        if (!$scope.user.email && !$scope.user.password) {
            growl.error("Email and password cannot be empty", {
                ttl: 3000
            });

        } else if (!$scope.user.email) {
            growl.error("Email cannot be empty", {
                ttl: 3000
            });

        } else if (!$scope.user.password) {
            growl.error("Password cannot be empty", {
                ttl: 3000
            });
        } else {

            var obj = loginService.validateUser($scope.user);
            console.log(obj);

            obj.then(function (response) {
                console.log(response, 'res');
                data = response.data;
                console.log(data);
                localStorage.clear();
                localStorage.setItem('userToken', data.token);
                $location.path('/home');
            }, function (error) {
                console.log(error, 'can not get data.');
                growl.error("Please enter correct user name and password.", {
                    ttl: 3000
                });
                $location.path('/login');
            });

        }
    }

}]);