myApp.service('viewRestaurantService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

        this.token = '';
        var temp = {};
        var taxTotal = 0;
        this.IsVisible = false;


        this.getToken = function () {
            return this.token;
        }

        var cart = {
            cartItems: [],
            subTotalCost: 0,
            totalCost: 0,
            taxes: {}
        }


        this.updateCart = function (ct) {
            cart = ct;
        }

        this.addCart = function () {
            return cart;
        }

        this.restaurantsList = [];

        var temp = {};
        this.taxTotal = 0;
        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.getAllInfo = function (currentCity, currentRestaurantId) {

            console.log(currentCity);
            var promise = $q.defer();
            // var cartLocal = JSON.parse(localStorage.getItem('cart'));
            //      if (cartLocal !== null) {
            //          this.cart = cartLocal;                 
            //          this.IsVisible = false;

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

                        var x = subCategory.filter(function (ele) {
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

                    var result = {};
                    result.restaurantInfo = response.data.data.restaurantInfo;
                    result.menuList = menuList;
                    result.subCategory = subCategory;
                    result.foodItems = foodItems;
                    console.log(result);

                    promise.resolve(result);


                }, function (error) {
                    promise.reject(error);

                });

            return promise.promise;
            // }
            //      else {
            //              this.cart = angular.copy(cart);
            //              this.cart['cartItems'] = this.cart['cartItems'];
            //              this.cart.subTotalCost = 0;
            //              this.cart.totalCost = 0;
            //              this.cart.taxes = {};
            //              }
        }

        this.addItem = function (itemToAdd) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
            if (this.cart == null) {
                localStorage.setItem('cart', JSON.stringify(cart));
                this.cart = JSON.parse(localStorage.getItem('cart'));
            }

            // this.IsVisible = false;
            console.log(this.cart);

            var o = this.cart.cartItems.find(function (el) {
                if (el._id == itemToAdd._id)
                    return el;
            });


            if (o) {
                //console.log(o.qty);
                o.qty++;
                itemToAdd.qty = o.qty;
                console.log(itemToAdd.qty);

            } else {

                itemToAdd.qty++;
                this.cart['cartItems'].push(itemToAdd);
                //console.log("$scope.cart['cartItems']", $scope.cart['cartItems']);
                //$scope.subTotalCost = $scope.subTotalCost + itemToAdd.foodPrice;
            }


            //console.log(itemToAdd.qty);
            //console.log(this.foodItems);

            for (var i = 0; i < itemToAdd.foodTaxes.length; i++) {
                obj = itemToAdd.foodTaxes[i];

                if (!temp[obj.taxName]) {
                    temp[obj.taxName] = ((obj.taxValue / 100) * itemToAdd.foodPrice * itemToAdd.qty);
                } else {
                    // console.log("hello");

                    temp[obj.taxName] += (obj.taxValue * itemToAdd.qty);

                }

                taxTotal = taxTotal + ((obj.taxValue / 100) * itemToAdd.foodPrice);
            }

            this.cart.taxes = temp;
            console.log(taxTotal);
            this.cart.subTotalCost = this.cart.subTotalCost + itemToAdd.foodPrice;
            this.cart.totalCost = this.cart.subTotalCost + taxTotal;
            this.updateCart(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            //var getUserInfo = checkoutService.getUserInfo(token);
        



    }

    //remove item from cart
    this.removeItem = function (itemToRemove) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        for (var j = 0; j < this.cart.cartItems.length; j++) {
            if (this.cart.cartItems[j]._id == itemToRemove._id) {
                //console.log($scope.cart);
                this.cart.cartItems[j].qty--;
                console.log(itemToRemove.qty);
                itemToRemove.qty = this.cart.cartItems[j].qty;
                console.log(itemToRemove.qty);


                for (var i = 0; i < itemToRemove.foodTaxes.length; i++) {
                    obj = itemToRemove.foodTaxes[i];

                    if (!temp[obj.taxName]) {
                        temp[obj.taxName] = ((obj.taxValue / 100) * itemToRemove.foodPrice * itemToRemove.qty);
                    } else {
                        // console.log("hello");

                        temp[obj.taxName] -= (obj.taxValue * itemToRemove.qty);

                    }

                    taxTotal = taxTotal - ((obj.taxValue / 100) * itemToRemove.foodPrice);
                }

                this.cart.subTotalCost = this.cart.subTotalCost - itemToRemove.foodPrice;
                this.cart.totalCost = this.cart.subTotalCost + taxTotal;


                if (this.cart.cartItems[j].qty == 0) {
                    var index = this.cart.cartItems.indexOf(itemToRemove);
                    this.cart.cartItems.splice(index, 1);
                }
            }

        }

        if (this.cart.cartItems.length == 0) {
            this.IsVisible = true;
            localStorage.removeItem('cart');
        }
        this.updateCart(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }


}



]);