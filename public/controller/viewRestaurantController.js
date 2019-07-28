myApp.controller('viewRestaurantController', ['$scope', '$rootScope', '$timeout', 'growl', '$state', '$stateParams', '$uibModal', 'viewRestaurantService', 'restaurantInfoAndMenu', function ($scope, $rootScope, $timeout, growl, $state, $stateParams, $uibModal, viewRestaurantService, restaurantInfoAndMenu) {

        ;
        (function (global) {

            var currentRestaurantId = $stateParams.currentRestaurantId;
            var currentCity = $stateParams.currentCity;

            var cartInLS = JSON.parse(localStorage.getItem('cart'));
            console.log(cartInLS)

            $scope.menuList = null;
            $scope.currentCategory = null;
            $scope.currentSubCategory = null;
            $scope.foodItemDisplay = null;
            $scope.addOn = null;

            //  $scope.IsVisible = true; //cart

            $scope.IsVisibleDiv = false; //init

            $scope.buttonDiv = true;

            $scope.tax = {};
            var taxTotal = 0;

            $scope.cart = JSON.parse(localStorage.getItem('cart'));

            // console.log($scope.cart)

            if (($scope.cart == null) || ($scope.cart.cartItems.length == 0)) {
                console.log("Null cart...create a cart!");
                $scope.IsVisible = true;
                var cartObj = {
                    cartItems: [],
                    subTotalCost: 0,
                    totalCost: 0,
                    taxes: {}
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));
            } else {
                console.log("Cart already present")
                // $scope.cart = JSON.parse(localStorage.getItem('cart'));  
                $scope.IsVisible = false;
            }
            console.log($scope.cart);

            if (restaurantInfoAndMenu) {
                var cartLocal = JSON.parse(localStorage.getItem('cart'));
                // console.log(cartLocal);
                if (cartLocal == null) {
                    $scope.cart = cartLocal;
                    // $scope.IsVisible = false;
                } else {
                    $scope.cart = JSON.parse(localStorage.getItem('cart'));
                    localStorage.setItem('cart', JSON.stringify($scope.cart));
                }

                var infoResponse = restaurantInfoAndMenu;
                console.log(restaurantInfoAndMenu);
                $scope.currentRestaurant = infoResponse.restaurantInfo;
                localStorage.setItem('restaurantInfo', JSON.stringify($scope.currentRestaurant));
                console.log($scope.currentRestaurant)
                $scope.menuList = infoResponse.menuList;
                $scope.subCategory = infoResponse.subCategory;
                $scope.foodItems = infoResponse.foodItems;
                $scope.addOn = infoResponse.addOn;
                // localStorage.setItem('allAddOn', JSON.stringify($scope.addOn));
                console.log($scope.addOn);

            } else {
                console.log('can not get data.');
                growl.error("Error while displaying restaurants", {
                    ttl: 3000
                });
                $state.go('allrestaurants', {
                    currentCity: currentCity
                }); // $location.path('/restaurants/' + currentCity);


            }

            $scope.getCurrentCategory = function (categoryName) {
                $scope.currentCategory = categoryName;
            }

            $scope.getCurrentSubCategory = function (subCategoryName) {
                $scope.currentSubCategory = subCategoryName;
            }

            //ng-init function load data
            $scope.loadData = function () {
                $scope.foodItemDisplay = $scope.menuList[0].subCategory[0].foodItems;
                $scope.currentCategory = $scope.menuList[0].categoryName;
                $scope.currentSubCategory = $scope.menuList[0].subCategory[0].subCategoryName;
            }

            //retrieve fooditems by restaurant name
            $scope.retrieveItem = function (cat, subcat) {
                $scope.currentSubCategory = subcat;
                $scope.currentCategory = cat;
            }

            //type-ahead input-formatter
            $scope.selected = '';
            $scope.formatInputField = function (food) {
                return $scope.selected ? food.foodName : '';
            }

            $scope.clearData = function () {
                $scope.selected = '';
            }

            //veg filter for typeahead
            $scope.isVegFilter = function () {
                if ($scope.myCheckbox) {
                    console.log("is veg function...");
                    var obj = [];

                    for (var i = 0; i < $scope.subCategory.length; i++) {
                        if ($scope.subCategory[i].isVeg == true) {
                            for (var j = 0; j < $scope.subCategory[i].foodItems.length; j++)
                                obj.push($scope.subCategory[i].foodItems[j]);
                        }
                    }
                    console.log(obj);
                    $scope.foodItems = obj;
                } else {
                    $scope.foodItems = $scope.menuRetrieved.foodItems;
                }
            }

            $scope.getQuantity = function (fooditem) {
                var cart = JSON.parse(localStorage.getItem('cart'));

                var o = cart.cartItems.find(function (el) {
                    if (el._id == fooditem._id)
                        return el;
                });
                if (o) {
                    return o.qty;
                } else {
                    return 0;
                }
            }

            $scope.getQuantityForAddOn = function (fooditem) {
                var cart = JSON.parse(localStorage.getItem('cart'));
                var o = cart.cartItems.find(function (el) {
                    if (el._id == fooditem._id)
                        return el;
                });
                if (o) {
                    return o.qty;
                } else {
                    return 0;
                }
            }

            $scope.addItem = function (itemToAdd, addOn) {


                $scope.foodItem = itemToAdd;
                $scope.IsVisible = false;
                console.log(addOn);
                viewRestaurantService.addItem(itemToAdd, addOn);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));

            }

            $scope.removeItem = function (itemToRemove, addOn) {
                viewRestaurantService.removeItem(itemToRemove, addOn);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                if ($scope.cart.cartItems.length == 0) {
                    $scope.IsVisible = true;
                }
            }

            var isEditMode = 0;

            $scope.checkCart = function (foodItem) {
                // console.log("yoyo")

                if (cartInLS.cartItems.length !== 0) {
                    // console.log("yoyo")


                    modalInstance = $uibModal.open({
                        animation: false,
                        templateUrl: 'pages/modalForCart.html',
                        scope: $scope,
                        controller: function ($scope, $uibModalInstance) {
                            console.log("yoyo")
                            $scope.cancelModal = function () {
                                $uibModalInstance.dismiss();
                            };
                            $scope.emptyTheCart = function () {
                                cartInLS = {
                                    cartItems: [],
                                    subTotalCost: 0,
                                    totalCost: 0,
                                    taxes: {}
                                };
                                localStorage.setItem('cart', JSON.stringify(cartInLS));
                                $scope.cart = JSON.parse(localStorage.getItem(('cart')));
                                if (foodItem.customizable === 'true')
                                    $scope.openCustomizationModal(foodItem, null, null);
                                else $scope.addItem(foodItem, null);

                            };
                            $scope.continueWithFlow = function () {
                                $uibModalInstance.close();
                            }
                            $scope.closeModal = function () {
                                $uibModalInstance.close();
                            }
                        },
                        size: 'md',
                        // backdrop: 'static',
                        resolve: {

                        }
                    });
                } else {
                    if (foodItem.customizable === 'true')
                        $scope.openCustomizationModal(foodItem, null, null);
                    else $scope.addItem(foodItem, null);
                }

            }



            $scope.openCustomizationModal= function(foodItem, isEditCustomisation, addOn) {

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

            $scope.askForCustomizationModal = function (foodItem) {
                var obj = $scope.cart.cartItems.find(function (el) {
                    if (el._id == foodItem._id) {
                        return el;
                    }
                });
                if (obj) {
                    $scope.foodItem = obj;
                    var len = $scope.foodItem.customisation.length;
                    if (len) {
                        $scope.lastAddOnAdded = $scope.foodItem.customisation[len - 1].addOn;
                    } else {
                        $scope.lastAddOnAdded = null;
                    }
                }

                modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'pages/askForCustomization.html',
                    scope: $scope,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.cancelModal = function () {
                            $uibModalInstance.dismiss();
                        };
                        $scope.repeatLastOrder = function () {

                            var cart = JSON.parse(localStorage.getItem('cart'));
                            var obj = cart.cartItems.find(function (el) {
                                if (el._id == foodItem._id) {
                                    return el;
                                }

                            });
                            if (obj) {
                                $scope.foodItem = obj;
                                var len = $scope.foodItem.customisation.length;
                                if (len) {
                                    // console.log("heloooooo 3")
                                    $scope.lastAddOnAdded = $scope.foodItem.customisation[len - 1].addOn;
                                } else {
                                    $scope.lastAddOnAdded = [];
                                    console.log($scope.lastAddOnAdded)
                                }
                            }
                            $scope.addItem($scope.foodItem, $scope.lastAddOnAdded);
                            $scope.cart = JSON.parse(localStorage.getItem('cart'));
                            $uibModalInstance.close();
                        };
                        $scope.closeModal = function () {
                            $uibModalInstance.close();
                        }
                    },
                    size: 'md',
                    // backdrop: 'static',
                    resolve: {

                    }
                });
            };

            $scope.checkRemoveButton = function (foodItem) {
                if (foodItem.customizable == 'true') {
                    growl.error("Delete customised items from cart only!", {
                        ttl: 3000
                    });
                } else {
                    $scope.removeItem(foodItem);
                }
            }

            $scope.calculateItemWithAddOnPrice = function (item, addOn) {
                return viewRestaurantService.calculateItemWithAddOnPrice(item, addOn);
            }

        }(window));
    }

]);