myApp.controller('checkoutController', ['$scope', '$uibModal', '$state',  'growl', 'checkoutService', 'viewRestaurantService', 'userInfo', function ($scope, $uibModal, $state, growl, checkoutService, viewRestaurantService, userInfo) {
console.log("here at checkout controller");
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

    $scope.paymentMode = ['Credit Card', 'Debit Card', 'Cash on Delivery'];
    console.log($scope.paymentMode);
    // window.onload= getUserInfo();

    $scope.selectedPaymentMode = {
        value: $scope.paymentMode[0]
    };

    var decodedData = null;
    var currentYear = new Date().getFullYear();
    console.log(currentYear);

    var decodedData = userInfo;
    $scope.userAddress = decodedData.address;

    $scope.checkValidExpiryMonth = false;
    $scope.checkValidExpiryYear = false;

    $scope.addItem = function (itemToAdd) {
        $scope.IsVisible = false;
        viewRestaurantService.addItem(itemToAdd);
        $scope.cart = JSON.parse(localStorage.getItem('cart'));
        console.log($scope.cart);

    }

    $scope.removeItem = function (itemToRemove) {
        viewRestaurantService.removeItem(itemToRemove);
        $scope.cart = JSON.parse(localStorage.getItem('cart'));
        if ($scope.cart.cartItems.length == 0) {
            $scope.IsVisible = true;
            console.log($scope.currentRestaurant.restaurantCity);
            $state.go('allrestaurants', {currentCity : $scope.currentRestaurant.restaurantCity});
            // $location.path('/restaurants/' + $scope.currentRestaurant.restaurantCity);
        }
    }
    
    $scope.newAddress = {};

    var modalInstance = '';
    $scope.openModal = function(task){
        modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'pages/modal.html',
            scope: $scope ,
            controller: function($scope, $uibModalInstance, formData) {
                $scope.ok = function(newAddress){
                    // console.log(newAddress);
                    // function addAddress(newAddress){
                        console.log(newAddress);
                        if (!$scope.newAddress.locality) {
                            $scope.checkValidLocality = true;
                
                        } else if (!$scope.newAddress.city) {
                            $scope.checkValidCity = true;
                            
                        } else if (!$scope.newAddress.pincode) {
                            $scope.checkValidPincode = true;
                            
                            
                        } else {
                
                            console.log(decodedData);
                            var obj = checkoutService.addAddress(newAddress, decodedData._id);
                
                            obj.then(function (response) {
                                console.log(response);
                
                                $scope.userAddress.push(newAddress);
                                
                                console.log($scope.newAddress);
                                $uibModalInstance.close();
                                // $scope.newAddress={};
                                // formData={};
                                growl.success("Address added successfully!", {
                                    ttl: 3000
                                });
                
                            }, function (error) {
                                console.log(error, 'can not get data.');
                
                            });
                        }    
                };

                $scope.cancelModal = function() {
                    $uibModalInstance.dismiss();
                };
            },
            size: 'md',
            // backdrop: 'static',
            resolve: {
            formData: function(){
                $scope.newAddress={};
                return $scope.newAddress;
            }
            }
        });
      };

    $scope.validateForm = function () {
        console.log($scope.formData.date);

        if (paymentMethod != "Cash on Delivery") {

            if ($scope.formData.name == null) {
                window.alert("Please enter valid name...");
                return false;
            } 
            else if (isNaN($scope.formData.cardNumber) || $scope.formData.cardNumber == null) {
                window.alert("Please enter valid card number...");
                return false;
            } 
            else if (isNaN($scope.formData.date.expiryMonth) || $scope.formData.date.expiryMonth < 1 || $scope.formData.date.expiryMonth > 12) {
                $scope.checkValidExpiryMonth = true;
            }
            else if (isNaN($scope.formData.date.expiryYear) || $scope.formData.date.expiryYear == null || $scope.formData.date.expiryYear < currentYear) {
                $scope.checkValidExpiryMonth = true;
            } 
            else if (isNaN($scope.formData.CVV) || $scope.formData.CVV == null) {
                window.alert("Please enter valid CVV...");
                return false;
            } 
            else {
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