myApp.controller('checkoutController', ['$scope', '$routeParams', '$http', '$location', 'growl', 'checkoutService', 'viewRestaurantService', 'getUserInfo', function ($scope, $routeParams, $http, $location, growl, checkoutService, viewRestaurantService, getUserInfo) {

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
    var paymentMethod = null;

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
    // $scope.getUserInfo = checkoutService.getUserInfo(token);

    // $scope.getUserInfo.then(function (response) {

    //     if (response.data.data) {
    //         console.log(response.data.data.address);
    //         decodedData = response.data.data;
    //         console.log(decodedData);
    //         if (decodedData.length == 0) {
    //             growl.info("Please enter a delivery address!", {
    //                 ttl: 3000
    //             });
    //         }
    //         $scope.userAddress = decodedData.address;
    //         console.log($scope.userAddress);
    //     }

    // }, function (error) {
    //     console.log(error, 'can not get data.');

    // });
    // console.log(decodedData);

    var decodedData = getUserInfo;
    $scope.userAddress = decodedData.address;

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
        if (!newAddress) {
            growl.error("Address cannot be empty string.",{ttl:3000});
            return;
        }
        console.log(decodedData);
        var obj = checkoutService.addAddress(newAddress, decodedData._id);

        obj.then(function (response) {
            console.log(response);
            var decodedData = getUserInfo;
            $scope.userAddress.push(newAddress);
            $scope.newAddress = null;
            console.log("old", token);
            // getUserInfo();

        }, function (error) {
            console.log(error, 'can not get data.');

        });


    }

    $scope.validateForm = function () {
        console.log($scope.formData);

        if (paymentMethod != "Cash on Delivery") {

            if ($scope.formData.name == null) {
                window.alert("Please enter your name...");
                return false;
            } else if ($scope.formData.cardNumber == null) {
                window.alert("Please enter your card number...");
                return false;
            } else if ($scope.formData.date == null) {
                window.alert("Please enter date...");
                return false;
            } else if ($scope.formData.CVV == null) {
                window.alert("Please enter CVV...");
                return false;
            } else {
                placeOrder();

            }

        } else {
            placeOrder();
        }

    }

    var placeOrder = function () {

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
        var placeOrder = checkoutService.placeOrder(data);
        console.log(placeOrder);

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
        paymentMethod = paymentMode;
        if (paymentMode == "Cash on Delivery") {
            $scope.creditDebitForm = false;
        } else {
            $scope.creditDebitForm = true;
        }
        $scope.formData.paymentMode = paymentMode;
    }

}]);