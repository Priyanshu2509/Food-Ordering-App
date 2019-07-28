myApp.service('viewRestaurantService', ['$http', 'growl', '$location', '$q', '$uibModal', function ($http, growl, $location, $q, $uibModal) {

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

        var obj;
     
        var customisation = [];

        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.addItem = function (itemToAdd, addOn) {

            var subTotalCost = 0;

            // console.log("FOOD:", itemToAdd);
            // console.log("ADDON:", addOn);

            this.cart = JSON.parse(localStorage.getItem('cart'));
            if (this.cart == null) {
                localStorage.setItem('cart', JSON.stringify(cart));
                this.cart = JSON.parse(localStorage.getItem('cart'));
            }
            this.IsVisible = false;

            var itemToAddTax = formatTaxFunction(itemToAdd);
            // console.log(itemToAddTax);
            if (this.cart.cartItems.length === 0) {
                this.cart['taxes'] = angular.copy(itemToAddTax);
            } else {
                for (var key in itemToAddTax) {
                    // console.log("i am here")
                    if (this.cart.taxes[key]) //if key is already present in taxes
                    {
                        this.cart.taxes[key] += itemToAddTax[key];
                    } else {
                        this.cart.taxes[key] = itemToAddTax[key];
                    }
                }
            }
            // console.log(this.cart.taxes)
            var o = this.cart.cartItems.find(function (el) {
                if (el._id == itemToAdd._id)
                    return el;
            });

            //if itemToAdd is already present
            if (o) {
                o.qty++;
                subTotalCost = o.foodPrice;
                // console.log("HEREEEE")
                if (o.customizable == "true") {
                    var tempString = this.createUniqueAddOnString(addOn);
                    var isSameAddOn = compareAddOnStrings(tempString, o.customisation);

                    //item same hai aur addon bhi same (addons are same)
                    if (isSameAddOn) {
                        // console.log("HEREEEE 2")
                        //same addon
                        for (var j = 0; j < o.customisation.length; j++) {
                            // console.log("HEREEEE 3")
                            // console.log(o.customisation)
                            if (o.customisation[j].uniqueString === tempString) {
                                o.customisation[j].addOnQty++;

                                for (k = 0; k < o.customisation[j].addOn.length; k++) {
                                    // console.log("HEREEEE 4")
                                    addOnObj = o.customisation[j].addOn[k];
                                    subTotalCost += addOnObj.foodPrice * addOnObj.qty;
                                    // console.log(subTotalCost);
                                }
                            }

                        }
                    }

                    //item same hai but addons alag
                    else {
                        // var customisation = [];
                        // console.log("item same hai but addons alag");
                        // itemToAdd.qty++;
                        if (addOn.length != 0) {
                            // console.log(o)
                            var uniqStr = this.createUniqueAddOnString(addOn);
                            for (var x = 0; x < addOn.length; x++) {
                                subTotalCost += addOn[x].foodPrice * addOn[x].qty;
                            }
                            // console.log(subTotalCost);
                            o.customisation.push({
                                addOn: addOn,
                                addOnQty: 1,

                                uniqueString: uniqStr
                            });
                        } else {
                            o.customisation.push({
                                addOn: [],
                                addOnQty: 1,

                                uniqueString: 'NoAddOns'
                            });
                        }

                    }
                } else {
                    o.customisation = [];
                }
            }

            //item hi alag hai
            else {

                customisation = [];
                itemToAdd.qty = 1;
                subTotalCost = itemToAdd.foodPrice;
                // console.log(subTotalCost)

                if (itemToAdd.customizable == "true") {
                    //if addOns exist 
                    if (addOn.length !== 0) {

                        // console.log(addOn)
                        for (var i = 0; i < addOn.length; i++) {
                            subTotalCost += addOn[i].foodPrice * addOn[i].qty;

                        }
                        var uniqStr = this.createUniqueAddOnString(addOn);
                        // console.log(subTotalCost);
                        customisation.push({
                            addOn: addOn,
                            addOnQty: 1,
                            uniqueString: uniqStr
                        });

                    } else {

                        customisation.push({
                            addOn: [],
                            addOnQty: 1,
                            uniqueString: 'NoAddOns'
                        });
                    }
                } else {

                    customisation = [];
                }
                itemToAdd['customisation'] = customisation;
                this.cart['cartItems'].push(itemToAdd);
            }
            // console.log(this.cart.taxes)

            if (itemToAdd.customisation.length !== 0) {
                for (i = 0; i < itemToAdd.customisation.length; i++) {
                    for (var j = 0; j < itemToAdd.customisation[i].addOn.length; j++) {
                        var tempObj = formatTaxFunction(itemToAdd.customisation[i].addOn[j]);
                        console.log(tempObj)

                        for (var key in tempObj) {
                            if (this.cart.taxes[key]) //if key is already present in taxes
                            {
                                this.cart.taxes[key] += tempObj[key] * itemToAdd.customisation[i].addOn[j].qty;
                            } else {
                                this.cart.taxes[key] = tempObj[key] * itemToAdd.customisation[i].addOn[j].qty;
                            }
                        }

                    }
                }
            }

            this.cart.subTotalCost += subTotalCost;

            this.updateCart(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }

        //remove item from cart
        this.removeItem = function (itemToRemove2, addOn) {
            // console.log("REMOVINGGG");
            // console.log(this.cart.subTotalCost);
            // subTotalCost = angular.copy(this.cart.subTotalCost);
            var subTotalCost = 0;
            var itemToRemove = null;
            this.cart = JSON.parse(localStorage.getItem('cart'));

            for (var i = 0; i < this.cart.cartItems.length; i++) {
                if (this.cart.cartItems[i]._id == itemToRemove2._id) {
                    itemToRemove = this.cart.cartItems[i];
                }
            }
            subTotalCost += itemToRemove.foodPrice;
            // console.log(subTotalCost);
            //console.log(this.cart.subTotalCost)
            var itemToRemoveTax = formatTaxFunction(itemToRemove);
            //console.log(itemToRemoveTax);
            for (var key in itemToRemoveTax) {
                if (this.cart.taxes[key]) //if key is already present in taxes
                {
                    this.cart.taxes[key] -= itemToRemoveTax[key];
                }
            }
            //  console.log(this.cart.taxes)
            // this.cart.subTotalCost = itemToRemove.foodPrice;
            if (itemToRemove.customizable == 'true') {
                // console.log("yoyo1", addOn)
                if (addOn.length === 0) {
                    // console.log("yoyo2")
                    for (var i = 0; i < itemToRemove.customisation.length; i++) {
                        if (itemToRemove.customisation[i].uniqueString === 'NoAddons') {
                            itemToRemove.customisation[i].addOnQty--;
                            if (itemToRemove.customisation[i].addOnQty === 0) {
                                // console.log("addon removed 1")
                                itemToRemove.customisation.splice(i, 1);
                            }
                        }
                    }
                } else {
                    var tempString = this.createUniqueAddOnString(addOn);
                    // console.log(this.cart.taxes)
                    for (var i = 0; i < itemToRemove.customisation.length; i++) {
                        if (itemToRemove.customisation[i].uniqueString === tempString) {
                            // console.log(itemToRemove.customisation[i])

                            for (var j = 0; j < itemToRemove.customisation[i].addOn.length; j++) {

                                subTotalCost += itemToRemove.customisation[i].addOn[j].foodPrice * itemToRemove.customisation[i].addOn[j].qty;

                                var tempObj = formatTaxFunction(itemToRemove.customisation[i].addOn[j]);
                                // console.log(tempObj)

                                for (var key in tempObj) {
                                    if (this.cart.taxes[key]) //if key is already present in taxes
                                    {
                                        this.cart.taxes[key] -= tempObj[key] * itemToRemove.customisation[i].addOn[j].qty;
                                    }
                                }

                            }
                            itemToRemove.customisation[i].addOnQty--;
                            if (itemToRemove.customisation[i].addOnQty === 0) {
                                itemToRemove.customisation.splice(i, 1);
                            }

                        }
                    }

                }
            }
            // console.log(this.cart.taxes)
            itemToRemove.qty--;
            // console.log(itemToRemove.qty)
            if (itemToRemove.qty === 0) {
                for (var j = 0; j < this.cart.cartItems.length; j++) {
                    if (this.cart.cartItems[j]._id === itemToRemove._id) {
                        this.cart.cartItems.splice(j, 1);

                        // if (itemToRemove.customisation.length == 0 && itemToRemove.qty == 0) {
                        //     this.cart.cartItems.splice(j, 1);
                        // }
                    }
                }
            }

            this.cart.subTotalCost -= subTotalCost;
            if (this.cart.cartItems.length == 0) {
                // this.IsVisible = true;
                this.cart['cartItems'] = [];
                this.cart.subTotalCost = 0;
                this.cart.totalCost = 0;
                this.cart.taxes = {};
            }
            this.updateCart(this.cart);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }

        this.createUniqueAddOnString = function (addOn) {
            var tempStr = '';
            addOn.sort(function (a, b) {
                return (a.foodName > b.foodName) ? 1 : ((b.foodName > a.foodName) ? -1 : 0);
            });
            for (var i = 0; i < addOn.length; i++) {
                tempStr += addOn[i].foodName + 'Qty' + addOn[i].qty;
            }
            // console.log(tempStr);
            if (tempStr !== '') {
                return tempStr;
            } else {
                return 'NoAddOns';
            }
        }

        function compareAddOnStrings(addOnStr, allAddOnsInItem) {
            // console.log(allAddOnsInItem);
            console.log(addOnStr)
            var object = allAddOnsInItem.find(function (el) {
                // console.log(el.uniqueString)
                if (el.uniqueString === addOnStr)
                    return el;
            });
            //console.log(object)
            if (object) {
                return true;
            } else {
                return false;
            }
        }

        this.calculateItemWithAddOnPrice = function (item, addOn) {
            //  console.log(addOn)
            var cost = 0;
            cost += item.foodPrice;

            for (var i = 0; i < addOn.length; i++) {
                cost += addOn[i].foodPrice * addOn[i].qty;
            }
            // console.log(cost)
            return cost;
        }

        function formatTaxFunction(foodItem) {
            // console.log(foodItem)
            var temp = {};
            for (var i = 0; i < foodItem.foodTaxes.length; i++) {
                obj = foodItem.foodTaxes[i];

                if (!temp[obj.taxName]) {
                    temp[obj.taxName] = ((obj.taxValue / 100) * foodItem.foodPrice);
                } else {

                    temp[obj.taxName] += ((obj.taxValue / 100) * foodItem.foodPrice);
                }

            }
            // console.log(temp)
            return temp;
        }



    }

]);