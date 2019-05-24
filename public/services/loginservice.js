myApp.service('loginService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

    this.validateUser=function(userCredentials){
        var promise=$q.defer();

        $http({
            method: "POST",
            url: "http://localhost:3000/api/users/authenticate",
            data: userCredentials
        })
        .then(function (response) {
            promise.resolve(response);
            
        }, function (error) {
            promise.reject(error);
            
        });

        return promise.promise;
    }
    

}]);

