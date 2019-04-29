myApp.service('checkoutService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

    this.getUserInfo = function (token) {
        var promise = $q.defer();

        console.log(token);
        $http({
                method: "POST",
                url: "http://localhost:3000/users/getinfo",
                data: {
                    token: token
                }
            })
            .then(function (response) {
                promise.resolve(response);
            }, function (error) {
                promise.reject(error);
            });


        return promise.promise;
    }


    this.addAddress = function (newAddress, id) {
        var promise = $q.defer();
        console.log("HRLLO");
        console.log(newAddress);
        console.log(id);
        // this.getUserInfo();

        if (!newAddress) {
            alert("Address cannot be empty");
        } else {
            $http({
                    method: "PUT",
                    url: "http://localhost:3000/users/addAddress",
                    data: {
                        newAddress: newAddress,
                        userId: id
                    }
                })
                .then(function (response) {
                    promise.resolve(response);

                }, function (error) {
                    promise.reject(error);
                });
        }

        return promise.promise;
    }

    this.placeorder = function (data) {
        var promise = $q.defer();

        if ($scope.addressChosen.value) {
            $http({
                    method: "POST",
                    url: "http://localhost:3000/orderDetails",
                    data: data
                })
                .then(function (response) {
                    promise.resolve(response);

                }, function (error) {
                    promise.reject(error);
                });

        } else {
            growl.error("Please select an address!", {
                ttl: 3000
            });
        }


        return promise.promise;
    }

}]);