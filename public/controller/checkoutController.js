myApp.controller('checkoutController', ['$scope', '$uibModal', '$state', 'growl', 'checkoutService', 'viewRestaurantService', 'userInfo', 'allAddOn', function ($scope, $uibModal, $state, growl, checkoutService, viewRestaurantService, userInfo, allAddOn) {

        ;
        (function (global) {
            // console.log("here at checkout controller");
            $scope.currentRestaurant = JSON.parse(localStorage.getItem('restaurantInfo'));
            $scope.cart = JSON.parse(localStorage.getItem('cart'));

            var token = localStorage.getItem('userToken');
            $scope.restaurantInfo = JSON.parse(localStorage.getItem('restaurantInfo'));

            $scope.formData = {};
            $scope.addressChosen = {
                value: ""
            };
            // console.log(token);
            $scope.creditDebitForm = true;
            var paymentMethod = null;

            $scope.paymentMode = ['Credit Card', 'Debit Card', 'Cash on Delivery'];

            $scope.selectedPaymentMode = {
                value: $scope.paymentMode[0]
            };

            if (allAddOn.length !== 0) {
                $scope.addOn = allAddOn;
            }
            // console.log($scope.addOn)
            $scope.calculateTotalCost = function () {
                var taxTotal = 0;
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                for (var key in $scope.cart.taxes) {
                    taxTotal += $scope.cart.taxes[key];
                }
                $scope.cart.totalCost = $scope.cart.subTotalCost + taxTotal;
            }

            var decodedData = null;
            var currentYear = new Date().getFullYear();
            // console.log(currentYear);

            var decodedData = userInfo;
            $scope.userAddress = decodedData.address;

            $scope.checkValidExpiryMonth = false;
            $scope.checkValidExpiryYear = false;

            $scope.addItem = function (itemToAdd, addOn) {
                $scope.IsVisible = false;
                viewRestaurantService.addItem(itemToAdd, addOn);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                $scope.calculateTotalCost();
                // console.log($scope.cart);
            }

            $scope.removeItem = function (itemToRemove, addOn, isEditMode) {

                viewRestaurantService.removeItem(itemToRemove, addOn);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                $scope.calculateTotalCost();
                console.log(isEditMode)
                if ($scope.cart.cartItems.length === 0) {

                    if (isEditMode === 0) {
                        $scope.IsVisible = true;
                        $state.go('allrestaurants', {
                            currentCity: $scope.currentRestaurant.restaurantCity
                        });
                    }
                }

            }

            $scope.calculateItemWithAddOnPrice = function (item, addOn) {
                var cost = viewRestaurantService.calculateItemWithAddOnPrice(item, addOn);
                return cost;
            }

            $scope.newAddress = {};

            $scope.openCustomizationModal = function (foodItem, isEditCustomisation, addOn) {
                modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'pages/customizationModal.html',
                    scope: $scope,
                    controller: 'openCustomizationModalController',
                    controllerAs: '$ctrl',
                    size: 'md',
                    resolve: {
                        foodItem: function () {
                            return foodItem;
                        },
                        isEditCustomisation: function () {
                            return isEditCustomisation;
                        },

                        addOn: function () {
                            return $scope.addOn;
                        }
                    }
                });
            };

            $scope.openModal = function (task) {
                modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'pages/modal.html',
                    scope: $scope,
                    controller: function ($scope, $uibModalInstance, formData) {
                        $scope.ok = function (newAddress) {
                            // console.log(newAddress);
                            // function addAddress(newAddress){
                            // console.log(newAddress);
                            if (!$scope.newAddress.locality) {
                                $scope.checkValidLocality = true;

                            } else if (!$scope.newAddress.city) {
                                $scope.checkValidCity = true;

                            } else if (!$scope.newAddress.pincode) {
                                $scope.checkValidPincode = true;


                            } else {
                                //console.log(decodedData);
                                var obj = checkoutService.addAddress(newAddress, decodedData._id);

                                obj.then(function (response) {

                                    $scope.userAddress.push(newAddress);

                                    $uibModalInstance.close();

                                    growl.success("Address added successfully!", {
                                        ttl: 3000
                                    });

                                }, function (error) {
                                    console.log(error, 'can not get data.');

                                });
                            }
                        };

                        $scope.cancelModal = function () {
                            $uibModalInstance.dismiss();
                        };
                    },
                    size: 'md',
                    // backdrop: 'static',
                    resolve: {
                        formData: function () {
                            $scope.newAddress = {};
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
                    } else if (isNaN($scope.formData.cardNumber) || $scope.formData.cardNumber == null) {
                        window.alert("Please enter valid card number...");
                        return false;
                    } else if (isNaN($scope.formData.date.expiryMonth) || $scope.formData.date.expiryMonth < 1 || $scope.formData.date.expiryMonth > 12) {
                        $scope.checkValidExpiryMonth = true;
                    } else if (isNaN($scope.formData.date.expiryYear) || $scope.formData.date.expiryYear == null || $scope.formData.date.expiryYear < currentYear) {
                        $scope.checkValidExpiryMonth = true;
                    } else if (isNaN($scope.formData.CVV) || $scope.formData.CVV == null) {
                        window.alert("Please enter valid CVV...");
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
                    localStorage.removeItem('cart');
                    localStorage.removeItem('restaurantInfo');
                    $state.go('allrestaurants', {
                        currentCity: $scope.restaurantInfo.restaurantCity
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

        }(window));
    }

]);