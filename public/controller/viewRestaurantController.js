myApp.controller('viewRestaurantController', ['$scope', '$http', '$routeParams', '$location', 'growl', 'viewRestaurantService', 'checkoutService', 'restaurantInfoAndMenu', function ($scope, $http, $routeParams, $location, growl, viewRestaurantService, checkoutService, restaurantInfoAndMenu) {

        ;
        (function (global) {
            var currentRestaurantId = $routeParams.currentRestaurantId;
            var currentCity = $routeParams.currentCity;

            console.log(currentRestaurantId);
            console.log(currentCity);

            $scope.menuList = null;
            $scope.currentCategory = null;
            $scope.currentSubCategory = null;
            $scope.foodItemDisplay = null;

            // $scope.IsVisible = true; //cart

            $scope.IsVisibleDiv = false; //init

            $scope.buttonDiv = true;

            $scope.tax = {};
            var taxTotal = 0;

            $scope.cart = JSON.parse(localStorage.getItem('cart'));

            if ($scope.cart == null) {
                var cartObj = {
                    cartItems: [],
                    subTotalCost: 0,
                    totalCost: 0,
                    taxes: {}
                };
                localStorage.setItem('cart', JSON.stringify(cartObj));
            }
            else{
                $scope.cart = JSON.parse(localStorage.getItem('cart'));  
                $scope.IsVisible=true;
            }



            console.log($scope.cart);
            // if($scope.cart.cartItems.length == 0){
            //     console.log($scope.IsVisible);
            //     $scope.IsVisible = true;
            // }
            // else{
            //     $scope.IsVisible = false;
            // }
            if (restaurantInfoAndMenu) {
                var cartLocal = JSON.parse(localStorage.getItem('cart'));
                console.log(cartLocal);

                if (cartLocal == null) {
                    $scope.cart = cartLocal;
                    $scope.IsVisible = false;

                } else {
                    $scope.cart = JSON.parse(localStorage.getItem('cart'));
                    $scope.IsVisible = true;
                    // $scope.cart = {};
                    // $scope.cart['cartItems'] = $scope.cart['cartItems'];
                    // $scope.cart.subTotalCost = 0;
                    // $scope.cart.totalCost = 0;
                    // $scope.cart.taxes = {};
                    localStorage.setItem('cart', JSON.stringify($scope.cart));

                }

                var infoResponse = restaurantInfoAndMenu;
                $scope.currentRestaurant = infoResponse.restaurantInfo;
                localStorage.setItem('restaurantInfo', JSON.stringify($scope.currentRestaurant));
                console.log($scope.currentRestaurant)
                $scope.menuList = infoResponse.menuList;
                $scope.subCategory = infoResponse.subCategory;
                $scope.foodItems = infoResponse.foodItems;
                //   $scope.loadData();

            } else {
                console.log(error, 'can not get data.');
                growl.error("Error while displaying restaurants");
                $location.path('/restaurants/' + currentCity);

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
                //console.log(food);
                return $scope.selected ? food.foodName : '';

            }

            $scope.clearData = function () {
                $scope.selected = '';
            }

            //veg filter for typeahead
            $scope.isVegFilter = function () {
                if ($scope.myCheckbox) {
                    //$scope.foodItems=null;
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
                // console.log(o);
                if (o) {
                    return o.qty;
                } else {
                    return 0;

                }
            }

            $scope.addItem = function (itemToAdd) {
                $scope.IsVisible = false;
                viewRestaurantService.addItem(itemToAdd);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                // console.log($scope.cart);

            }

            $scope.removeItem = function (itemToRemove) {
                // $scope.IsVisible = false;
                viewRestaurantService.removeItem(itemToRemove);
                $scope.cart = JSON.parse(localStorage.getItem('cart'));
                if ($scope.cart.cartItems.length == 0) {
                    $scope.IsVisible = true;
                }
                // console.log($scope.cart);

            }

        }(window));
    }

]);