myApp.service('checkoutService', ['$http', 'growl', '$uibModal', '$q', function ($http, growl, $uibModal, $q) {

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
        console.log(data)
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