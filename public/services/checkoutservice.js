myApp.service('checkoutService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

    // this.getUserInfo = function (token) {
    //     var promise = $q.defer();

    //     console.log(token);
    //     $http({
    //             method: "POST",
    //             url: "http://localhost:3000/users/getinfo",
    //             data: {
    //                 token: token
    //             }
    //         })
    //         .then(function (response) {
    //             promise.resolve(response);
    //         }, function (error) {
    //             promise.reject(error);
    //         });


    //     return promise.promise;
    // }


    this.addAddress = function (newAddress, id) {
        var promise = $q.defer();    

            $http({
                    method: "PUT",
                    url: "http://localhost:3000/api/users/addAddress",
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

        return promise.promise;
    }

    this.placeOrder = function (data) {
        var promise = $q.defer();

        if (data.deliveryAddress) {
            $http({
                    method: "POST",
                    url: "http://localhost:3000/api/orderDetails",
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