myApp.controller('viewRestaurantController', ['$scope', '$http', '$routeParams', '$location', 'growl','viewRestaurantService',  function ($scope, $http, $routeParams, $location, growl, viewRestaurantService) {

        var currentRestaurantId = $routeParams.currentRestaurantId;
        var currentCity = $routeParams.currentCity;

        console.log(currentRestaurantId);
        console.log(currentCity);

        viewRestaurantService.setCurrentRestaurantId(currentRestaurantId);
        viewRestaurantService.setCurrentCity(currentCity);

        $scope.menuList = null;
        $scope.currentCategory = null;
        $scope.currentSubCategory = null;
        $scope.foodItemDisplay = null;

        $scope.IsVisible = true; //cart

        $scope.IsVisibleDiv = false; //init

        $scope.buttonDiv = true;

        $scope.tax = {};

        var cartObj = {
            cartItems: [],
            subtotal: 0,
            total: 0,
            taxes: {}
        };

        var taxTotal = 0;

        var temp = {};
        var obj;
        var cartLocal = JSON.parse(localStorage.getItem('cart'));
        if (cartLocal !== null) {
            $scope.cart = cartLocal;
            $scope.IsVisible = false;
        } else {
            $scope.cart = angular.copy(cartObj);
            $scope.cart['cartItems'] = $scope.cart['cartItems'];
            $scope.cart.subTotalCost = 0;
            $scope.cart.totalCost = 0;
            $scope.cart.taxes = {};
        }


        var obj = viewRestaurantService.getAllInfo();

        obj.then(function (response) {
            console.log(response);
            $scope.currentRestaurant=response.restaurantInfo;
            console.log($scope.currentRestaurant)
            $scope.menuList=response.menuList;

       

        }, function (error) {

            console.log(error, 'can not get data.');
            growl.error("Error while displaying restaurants");
            // $location.path('/restaurants/' + currentCity);

        })


        // $scope.getAllInfo = function () {
        //     appService.getAllInfo.then(function (data) {
        //         console.log(data);
        //         $scope.menu = data;
        //         console.log($scope.menu);
        //     });

        // $http({
        //         method: "GET",
        //         url: "http://localhost:3000/allrestaurants/" + $scope.currentCity + '/' + $scope.currentRestaurantId,
        //         data: {
        //             city: $scope.currentCity,
        //             restaurantId: $scope.currentRestaurantId
        //         }
        //     })
        //     .then(function (response) {

        //         $scope.menuRetrieved = (response.data.data);
        //         $scope.currentRestaurant = response.data.data.restaurantInfo;
        //         localStorage.setItem('restaurantInfo', JSON.stringify($scope.currentRestaurant));

        //         $scope.menuList = $scope.menuRetrieved.category;
        //         $scope.subCategory = $scope.menuRetrieved.subCategory;
        //         $scope.foodItems = $scope.menuRetrieved.foodItems;



        //         if(localStorage.getItem('cart')){
        //             console.log("found");
        //             for(var i=0;i<$scope.foodItems.length;i++){

        //                 var obj = $scope.cart.cartItems.find(function (el) {
        //                     if (el._id == $scope.foodItems[i]._id)
        //                         return el;
        //                 });

        //                 if(obj){
        //                     $scope.foodItems[i].qty=obj.qty;
        //                 }

        //             }
        //         }

        //         $scope.mappingFunc1();
        //         $scope.mappingFunc2();
        //         console.log($scope.menuList);
        //         console.log($scope.foodItems);
        //         callback($scope.menuList);

        //     }, function (error) {
        //         console.log(error, 'can not get data.');
        //         growl.error("Error while displaying restaurants");
        //         $location.path('/restaurants/' + $scope.currentCity);
        //     });

        //}

        // window.onload=function(){
        //     $scope.loadData();
        // }

        // $scope.getAllInfo(function () {
        //     $scope.loadData();

        // });
        //$scope.loadData();

        // $scope.mappingFunc1 = function () {

        //     for (var i in $scope.menuList) {

        //         var x = $scope.subCategory.filter(function (ele) {
        //             return $scope.menuList[i]._id == ele.categoryId;
        //         });

        //         if (x) {
        //             $scope.menuList[i].subCategory = x;
        //         }
        //     }
        // }

        // $scope.mappingFunc2 = function () {
        //     for (var i in $scope.menuList) {
        //         for (var j = 0; j < $scope.menuList[i].subCategory.length; j++) {

        //             var x = $scope.foodItems.filter(function (ele) {
        //                 return $scope.menuList[i].subCategory[j]._id == ele.subCategoryId;
        //             });

        //             if (x) {
        //                 $scope.menuList[i].subCategory[j].foodItems = x;
        //             }

        //         }

        //     }
        //     console.log($scope.menuList);

        // }

        //qty mapping for menu on reload
        // window.onload = function() {
        //     var reloading = sessionStorage.getItem("reloading");
        //     if (reloading) {
        //         sessionStorage.removeItem("reloading");
        //         myFunction();
        //     }
        // }

        // function reloadP() {
        //     sessionStorage.setItem("reloading", "true");
        //     document.location.reload();
        // }
        // reloadP();

        // $scope.findCurrentRestaurant = function () {

        //     $http({
        //         method: "GET",
        //             url: "http://localhost:3000/getRestaurant/" + $scope.currentRestaurantId,
        //             data: {
        //             restaurantId: $scope.currentRestaurantId
        //            }
        //     })
        //     .then(function (response) {

        //         console.log(response);
        //         localStorage.setItem('currentRestaurant',JSON.stringify(response.data.restaurant));

        //         $scope.currentRestaurant=JSON.parse(localStorage.getItem('currentRestaurant'));
        //         console.log($scope.currentRestaurant);
        //     }, function (error) {
        //         console.log(error, 'can not get data.');

        //     });
        // };

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

        $scope.addItem = function (itemToAdd) {
            appService.addItem(itemToAdd);
        }

        //Add new item in cart
        // $scope.addItem = function (itemToAdd) {

        //     $scope.IsVisible = false;
        //     console.log($scope.cart.cartItems);
        //     var o = $scope.cart.cartItems.find(function (el) {
        //         if (el._id == itemToAdd._id)
        //             return el;
        //     });


        //     if (o) {
        //         //console.log(o.qty);
        //         o.qty++;
        //         itemToAdd.qty=o.qty;
        //         //console.log(o.qty);

        //     } else {

        //         itemToAdd.qty++;
        //         $scope.cart['cartItems'].push(itemToAdd);
        //         //console.log("$scope.cart['cartItems']", $scope.cart['cartItems']);
        //         //$scope.subTotalCost = $scope.subTotalCost + itemToAdd.foodPrice;
        //     }

        //     console.log(itemToAdd.qty);
        //     console.log($scope.foodItems);

        //     for (var i = 0; i < itemToAdd.foodTaxes.length; i++) {
        //         obj = itemToAdd.foodTaxes[i];

        //         if (!temp[obj.taxName]) {
        //             temp[obj.taxName] = ((obj.taxValue / 100) * itemToAdd.foodPrice * itemToAdd.qty);
        //         } else {
        //             // console.log("hello");

        //             temp[obj.taxName] += (obj.taxValue * itemToAdd.qty);

        //         }

        //         taxTotal = taxTotal + ((obj.taxValue / 100) * itemToAdd.foodPrice);
        //     }

        //     $scope.cart.taxes = temp;
        //     console.log(taxTotal);
        //     $scope.cart.subTotalCost = $scope.cart.subTotalCost + itemToAdd.foodPrice;
        //     $scope.cart.totalCost = $scope.cart.subTotalCost + taxTotal;

        //     appService.updateCart($scope.cart);
        //     localStorage.setItem('cart', JSON.stringify($scope.cart));
        //     //$scope.clearData();
        // }




        // //remove item from cart
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
    }
]);