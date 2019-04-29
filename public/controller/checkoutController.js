myApp.controller('checkoutController', ['$scope', '$routeParams', '$http', '$location', 'growl', 'checkoutService', 'viewRestaurantService', function ($scope, $routeParams, $http, $location, growl, checkoutService, viewRestaurantService) {

    $scope.currentRestaurant = JSON.parse(localStorage.getItem('restaurantInfo'));
    $scope.cart = JSON.parse(localStorage.getItem('cart'));

    var token = localStorage.getItem('userToken');
    $scope.restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo'));

    $scope.formData = {};
    $scope.addressChosen = {
        value: ""
    };
    console.log(token);
    $scope.creditDebitForm = true;

    // var arr=['Credit Card', 'Debit Card', 'Cash on Delivery'];
    // localStorage.setItem('paymentMode', JSON.stringify(arr));

    $scope.paymentMode = ['Credit Card', 'Debit Card', 'Cash on Delivery'];
    console.log($scope.paymentMode);
    // window.onload= getUserInfo();

    $scope.selectedPaymentMode = {
        value: $scope.paymentMode[0]
    };

    var decodedData = null;
    // var newAddress = null;

    //token decoding  
    $scope.getUserInfo = checkoutService.getUserInfo(token);

    $scope.getUserInfo.then(function (response) {

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

    });
    // console.log(decodedData);

    $scope.addItem = function (itemToAdd) {
        $scope.IsVisible = false;
        viewRestaurantService.addItem(itemToAdd);
        $scope.cart = JSON.parse(localStorage.getItem('cart'));
        console.log($scope.cart);

    }

    $scope.removeItem = function (itemToRemove) {
        // $scope.IsVisible = false;
        viewRestaurantService.removeItem(itemToRemove);
        $scope.cart = JSON.parse(localStorage.getItem('cart'));
        if ($scope.cart.cartItems.length == 0) {
            $scope.IsVisible = true;
            $location.path('/restaurants/' + $scope.currentRestaurant.restaurantCity);
        }
    }
    // checkoutService.getUserInfo(token);


    $scope.addAddress = function (newAddress) {
        console.log(decodedData);
        var obj = checkoutService.addAddress(newAddress, decodedData._id);

        obj.then(function (response) {
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

    $scope.placeOrder = function () {

        var placeOrder = checkoutService.placeOrder(data);

        var data = {
            userId: decodedData._id,
            userName: decodedData.name,
            cart: $scope.cart,
            restaurantId: $scope.restaurantInfo._id,
            restaurantName: $scope.restaurantInfo.restaurantName,
            restaurantCity: $scope.restaurantInfo.restaurantCity,
            deliveryAddress: $scope.addressChosen.value,
            paymentDetails: $scope.formData
        }

        placeOrder.then(function (response) {
            console.log(response);
            growl.success("Order Placed Successfully!", {
                ttl: 3000
            });

        }, function (error) {
            console.log(error, 'can not get data.');
        });

    }



    $scope.changePaymentMode = function (paymentMode) {
        console.log(paymentMode);
        if (paymentMode == "Cash on Delivery") {
            $scope.creditDebitForm = false;
        }
        $scope.formData.paymentMode = paymentMode;
    }

}]);