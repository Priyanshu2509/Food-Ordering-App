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
            var cart = ct;
        }

        this.addCart = function () {
            return cart;
        }

        this.restaurantsList = [];

        var temp = {};
        var obj;
        this.taxTotal = 0;
        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.addItem = function (itemToAdd) {
            // var itemToAdd = angular.copy(item);

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
                // itemToAdd.qty = o.qty;
                console.log(itemToAdd.qty);

            } else {
                itemToAdd.qty = 1;
                this.cart['cartItems'].push(itemToAdd);
            }

            for (var i = 0; i < itemToAdd.foodTaxes.length; i++) {
                obj = itemToAdd.foodTaxes[i];

                if (!temp[obj.taxName]) {
                    temp[obj.taxName] = ((obj.taxValue / 100) * itemToAdd.foodPrice * itemToAdd.qty);
                } else {
                    // console.log("hello");

                    temp[obj.taxName] += ((obj.taxValue / 100) * itemToAdd.foodPrice) * itemToAdd.qty;

                }
                console.log(temp);

                taxTotal = taxTotal + ((obj.taxValue / 100) * itemToAdd.foodPrice);
            }
            console.log("HELLO");
            console.log(temp);
            this.cart.taxes = temp;

            console.log(taxTotal);
            this.cart.subTotalCost = this.cart.subTotalCost + itemToAdd.foodPrice;
            this.cart.totalCost = this.cart.subTotalCost + taxTotal;
            this.updateCart(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }


        //remove item from cart
        this.removeItem = function (itemToRemove) {
            // var itemToRemove = angular.copy(item);
            this.cart = JSON.parse(localStorage.getItem('cart'));
            for (var j = 0; j < this.cart.cartItems.length; j++) {
                if (this.cart.cartItems[j]._id == itemToRemove._id) {
                    console.log(itemToRemove);
                    this.cart.cartItems[j].qty--;
                    if (this.cart.cartItems[j].qty == 0) {

                        this.cart.cartItems.splice(j, 1);
                    }

                    console.log(itemToRemove.qty);


                    for (var i = 0; i < itemToRemove.foodTaxes.length; i++) {
                        obj = itemToRemove.foodTaxes[i];

                        console.log(obj.taxValue);
                        temp[obj.taxName] -= ((obj.taxValue / 100) * itemToRemove.foodPrice);

                        taxTotal = taxTotal - ((obj.taxValue / 100) * itemToRemove.foodPrice);
                    }

                    this.cart.taxes = temp;

                    this.cart.subTotalCost = this.cart.subTotalCost - itemToRemove.foodPrice;
                    this.cart.totalCost = this.cart.subTotalCost + taxTotal;

                   
                }
                if (this.cart.cartItems.length == 0) {
                    this.IsVisible = true;

                    this.cart['cartItems'] = [];
                    this.cart.subTotalCost = 0;
                    this.cart.totalCost = 0;
                    this.cart.taxes = {};
                }

                this.updateCart(this.cart);
                localStorage.setItem('cart', JSON.stringify(this.cart));

            }



        }

    }

]);