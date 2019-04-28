myApp.service('viewRestaurantService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

        this.token = '';

        // this.updateToken = function (t) {
        //     this.token = t;
        // }

        this.getToken = function () {
            return this.token;
        }

        this.cart = {
            cartItems: [],
            subTotalCost: 0,
            totalCost: 0,
            taxes: {}
        }


        this.updateCart = function (ct) {
            this.cart = ct;
        }

        this.addCart = function () {
            return this.cart;
        }

        this.restaurantsList = [];

        var currentCity = '';
        var currentRestaurantId = '';



        //var restaurantInfo=JSON.parse(localStorage.getItem('restaurantInfo'));


        this.IsVisible = true;
        var temp = {};
        this.taxTotal = 0;
        var cart = JSON.parse(localStorage.getItem('cart'));



        this.setCurrentCity = function (city) {
            currentCity = city;
        }

        this.setCurrentRestaurantId = function (restaurantId) {
            currentRestaurantId = restaurantId;
        }

        this.getAllInfo = function () {

            console.log(currentCity);
            var promise = $q.defer();
            $http({
                    method: "GET",
                    url: "http://localhost:3000/allrestaurants/" + currentCity + '/' + currentRestaurantId,
                    data: {
                        city: currentCity,
                        restaurantId: currentRestaurantId
                    }
                })
                .then(function (response) {
                    //console.log(response);
                    var menuRetrieved = (response.data.data);
                    var menuList = menuRetrieved.category;
                    var subCategory = menuRetrieved.subCategory;
                    var foodItems = menuRetrieved.foodItems;

                    //mapping1
                    for (var i in menuList) {

                        var x =subCategory.filter(function (ele) {
                            return menuList[i]._id == ele.categoryId;
                        });

                        if (x) {
                            menuList[i].subCategory = x;
                        }
                    }

                    //mapping2
                    for (var i in menuList) {
                        for (var j = 0; j < menuList[i].subCategory.length; j++) {

                            var x = foodItems.filter(function (ele) {
                                return menuList[i].subCategory[j]._id == ele.subCategoryId;
                            });

                            if (x) {
                                menuList[i].subCategory[j].foodItems = x;
                            }

                        }

                    }

                    var result={};
                    result.restaurantInfo=response.data.data.restaurantInfo;
                    result.menuList=menuList;
                    console.log(result);

                    promise.resolve(result);


                }, function (error) {
                    promise.reject(error);

                });

            return promise.promise;
        }
    }

    // var mappingFunc1 = function () {

    //     for (var i in menuList) {

    //         var x =subCategory.filter(function (ele) {
    //             return menuList[i]._id == ele.categoryId;
    //         });

    //         if (x) {
    //             menuList[i].subCategory = x;
    //         }
    //     }
    // }

    //  var mappingFunc2 = function () {
    //     for (var i in menuList) {
    //         for (var j = 0; j < menuList[i].subCategory.length; j++) {

    //             var x =foodItems.filter(function (ele) {
    //                 return menuList[i].subCategory[j]._id == ele.subCategoryId;
    //             });

    //             if (x) {
    //                 menuList[i].subCategory[j].foodItems = x;
    //             }

    //         }

    //     }
    //console.log(menuList);
    //}
    // var cartLocal = JSON.parse(localStorage.getItem('cart'));
    // if (cartLocal !== null) {
    //     cart = cartLocal;
    //     this.IsVisible = false;
    // } else {
    //     this.cart = angular.copy(cartObj);
    //     this.cart['cartItems'] = this.cart['cartItems'];
    //     this.cart.subTotalCost = 0;
    //     this.cart.totalCost = 0;
    //     this.cart.taxes = {};
    // }

    // this.addItem = function (itemToAdd) {

    //     this.IsVisible = false;
    //     console.log(this.cart.cartItems);
    //     var o = this.cart.cartItems.find(function (el) {
    //         if (el._id == itemToAdd._id)
    //             return el;
    //     });


    //     if (o) {
    //         //console.log(o.qty);
    //         o.qty++;
    //         itemToAdd.qty = o.qty;
    //         console.log(o.qty);

    //     } else {

    //         itemToAdd.qty++;
    //         cart['cartItems'].push(itemToAdd);
    //         //console.log("$scope.cart['cartItems']", $scope.cart['cartItems']);
    //         //$scope.subTotalCost = $scope.subTotalCost + itemToAdd.foodPrice;
    //     }

    //     console.log(itemToAdd.qty);
    //     //console.log(this.foodItems);

    //     for (var i = 0; i < itemToAdd.foodTaxes.length; i++) {
    //         obj = itemToAdd.foodTaxes[i];

    //         if (!temp[obj.taxName]) {
    //             temp[obj.taxName] = ((obj.taxValue / 100) * itemToAdd.foodPrice * itemToAdd.qty);
    //         } else {
    //             // console.log("hello");

    //             temp[obj.taxName] += (obj.taxValue * itemToAdd.qty);

    //         }

    //         this.taxTotal = this.taxTotal + ((obj.taxValue / 100) * itemToAdd.foodPrice);
    //     }

    //     cart.taxes = this.temp;
    //     //console.log(taxTotal);
    //     this.cart.subTotalCost = this.cart.subTotalCost + itemToAdd.foodPrice;
    //     this.cart.totalCost = this.cart.subTotalCost + this.taxTotal;

    //     this.updateCart(cart);
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     //$scope.clearData();
    // }




    //remove item from cart
    // $scope.removeItem = function (itemToRemove) {

    //     for (var j = 0; j < $scope.cart.cartItems.length; j++) {
    //         if ($scope.cart.cartItems[j]._id == itemToRemove._id) {
    //             //console.log($scope.cart);
    //             $scope.cart.cartItems[j].qty--;
    //             console.log(itemToRemove.qty);
    //             itemToRemove.qty= $scope.cart.cartItems[j].qty;
    //             console.log(itemToRemove.qty);


    //             for (var i = 0; i < itemToRemove.foodTaxes.length; i++) {
    //                 obj = itemToRemove.foodTaxes[i];

    //                 if (!temp[obj.taxName]) {
    //                     temp[obj.taxName] = ((obj.taxValue / 100) * itemToRemove.foodPrice * itemToRemove.qty);
    //                 } else {
    //                     // console.log("hello");

    //                     temp[obj.taxName] -= (obj.taxValue * itemToRemove.qty);

    //                 }

    //                 taxTotal = taxTotal - ((obj.taxValue / 100) * itemToRemove.foodPrice);
    //             }

    //             $scope.cart.subTotalCost = $scope.cart.subTotalCost - itemToRemove.foodPrice;
    //             $scope.cart.totalCost = $scope.cart.subTotalCost + taxTotal;


    //             if ($scope.cart.cartItems[j].qty == 0) {
    //                 var index = $scope.cart.cartItems.indexOf(itemToRemove);
    //                 $scope.cart.cartItems.splice(index, 1);
    //             }
    //         }

    //     }

    //     if ($scope.cart.cartItems.length == 0) {
    //         $scope.IsVisible = true;
    //     }
    //     appService.updateCart($scope.cart);
    //     localStorage.setItem('cart', JSON.stringify($scope.cart));
    // }


]);