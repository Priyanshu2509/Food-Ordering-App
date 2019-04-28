myApp.controller('checkoutController', ['$scope', '$routeParams', '$http', '$location', 'growl', 'appService',
    function ($scope, $routeParams, $http, $location, growl, appService) {

        //$scope.cart = appService.addCart();
        $scope.currentRestaurant = JSON.parse(localStorage.getItem('currentRestaurant'));
        $scope.cart = JSON.parse(localStorage.getItem('cart'));

        var token = localStorage.getItem('userToken');
        $scope.restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo'));

        $scope.formData = {};
        $scope.addressChosen = {
            value: ""
        };
        console.log(token);

        //var arr=['Credit Card', 'Debit Card', 'Cash on Delivery'];
        //localStorage.setItem('paymentMode', JSON.stringify(arr));

        $scope.paymentMode = ['Credit Card', 'Debit Card', 'Cash on Delivery'];
        console.log($scope.paymentMode);
        getUserInfo();

        $scope.selectedPaymentMode = {
            value: $scope.paymentMode[0]
        };

        //token decoding
        function getUserInfo() {
            console.log(token);
            $http({
                    method: "POST",
                    url: "http://localhost:3000/users/getinfo",
                    data: {
                        token: token
                    }
                })
                .then(function (response) {
                    if (response.data.data) {
                        console.log(response.data.data.address);
                        decodedData = response.data.data;
                        console.log(decodedData);
                        if (decodedData.length == 0) {
                            growl.info("Please enter a delivery address!", {
                                ttl: 3000
                            });
                        }
                        $scope.userAddress = decodedData.address;
                        console.log($scope.userAddress);

                    }
                }, function (error) {
                    console.log(error, 'can not get data.');
                    //growl.error("Order couldn't be placed!", {ttl: 3000});


                });
        }

        // $scope.callGrowl = function () {
        //     growl.success("Order placed Successfully!", {
        //         ttl: 3000
        //     });
        // }

        $scope.addAddress = function (newAddress) {
            console.log(decodedData);
            if (!newAddress) {
                alert("Address cannot be empty");
            } else {
                $http({
                        method: "PUT",
                        url: "http://localhost:3000/users/addAddress",
                        data: {
                            newAddress: newAddress,
                            userId: decodedData._id
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        if (newAddress) {
                            growl.success("Address added successfully!", {
                                ttl: 3000
                            });
                        }

                        console.log("old", token);

                        getUserInfo();

                    }, function (error) {
                        console.log(error, 'can not get data.');
                    });
            }
        }

        //$scope.dispVal = function(){console.log($scope.addressChosen)}
        $scope.placeOrder = function () {
            // console.log(typeof $scope.addressChosen.value);

            if ($scope.addressChosen.value) {
                $http({
                        method: "POST",
                        url: "http://localhost:3000/orderDetails",
                        data: {
                            userId: decodedData._id,
                            userName: decodedData.name,
                            cart: $scope.cart,
                            restaurantId: $scope.restaurantInfo._id,
                            restaurantName: $scope.restaurantInfo.restaurantName,
                            restaurantCity: $scope.restaurantInfo.restaurantCity,
                            deliveryAddress: $scope.addressChosen.value,
                            paymentDetails: $scope.formData
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        growl.success("Order Placed Successfully!", {
                            ttl: 3000
                        });
                    }, function (error) {
                        console.log(error, 'can not get data.');

                    });
            } else {
                growl.error("Please select an address!", {
                    ttl: 3000
                });
            }
        }

        $scope.changePaymentMode = function (paymentMode) {
            $scope.formData.paymentMode = paymentMode;
        }
    }
]);