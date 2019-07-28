myApp.controller('loginController', ['$scope', '$http', '$location', 'growl',  '$state', 'loginService', function ($scope, $http, $location, growl, $state, loginService) {

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
            // console.log(obj);

            obj.then(function (response) {
                // console.log(response, 'res');
                data = response.data;
                // console.log(data);
                localStorage.clear();
                localStorage.setItem('userToken', data.token);
                // $scope.logoutButtonDiv=true;
               
                // $location.path('/home');
                $state.go('home');
                //  location.reload();
                
            }, function (error) {
                console.log(error, 'can not get data.');
                growl.error("Please enter correct user name and password.", {
                    ttl: 3000
                });
                $state.go('login');
                // $state.go('allrestaurants', { currentCity : $scope.cityName});
                // $location.path('/login');
            });

        }
    }

}]);