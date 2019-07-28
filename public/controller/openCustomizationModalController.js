myApp.controller('openCustomizationModalController', ['$scope', '$rootScope', '$uibModalInstance', '$state', 'growl', 'checkoutService', 'viewRestaurantService', 'foodItem', 'isEditCustomisation', 'addOn', function ($scope, $rootScope, $uibModalInstance, $state, growl, checkoutService, viewRestaurantService, foodItem, isEditCustomisation, addOn) {

    $scope.mappedAddOns = [];
    var addOnArr = [];
    // if ($scope.addOn.length == 0) {
    //     $scope.addOn = addOn;
    // }
    $scope.addOn = addOn
    // console.log($scope.addOn)
    // $scope.addOn = $rootScope.addOn;
    var updatedAddOnArr = angular.copy(addOnArr);
    for (var i = 0; i < $scope.addOn.length; i++) {
        for (var j = 0; j < $scope.addOn[i].foodItemsMappedTo.length; j++) {
            if (foodItem._id === $scope.addOn[i].foodItemsMappedTo[j]) {
                $scope.mappedAddOns.push($scope.addOn[i]);
            }
        }
    }
    if (isEditCustomisation) {
        // var oldString = viewRestaurantService.createUniqueAddOnString(isEditCustomisation);
        addOnArr = isEditCustomisation;
        updatedAddOnArr = angular.copy(addOnArr);
        isEditMode = 1;
    } else {
        addOnArr = [];
        isEditMode = 0;
    }

    // $scope.disabled = function (addonItem) {
    //     //   console.log(addonItem)
    //     var object = $scope.mappedAddOns.find(function (el) {
    //         if (el._id === addonItem._id)
    //             return el;
    //     });
    //     if (object) {
    //         console.log(object)
    //         if (object.qty === addonItem.maxQtyToBeAdded) {
    //             return true;
    //         }

    //     }
    // }

    $scope.getAddOnQty = function (addOn3) {
        var object = updatedAddOnArr.find(function (el) {
            if (el._id === addOn3._id)
                return el;
        });
        if (object) {
            return object.qty;
        } else {
            return 0;
        }
    }


    $scope.billInModalBox = foodItem.foodPrice;
    if (updatedAddOnArr !== null) {
        for (var i = 0; i < updatedAddOnArr.length; i++) {
            $scope.billInModalBox += updatedAddOnArr[i].foodPrice * updatedAddOnArr[i].qty;
        }
    }

    $scope.ok = function () {
        var count = 0;
        var str = viewRestaurantService.createUniqueAddOnString(addOnArr);
        if (isEditMode === 0) {
            // console.log("not in editing mode")
            addOnArr = angular.copy(updatedAddOnArr);
            $scope.addItem(foodItem, addOnArr);
        } else {
            // console.log("editing mode");
            console.log(isEditMode)
            for (var j = 0; j < foodItem.customisation.length; j++) {
                if (foodItem.customisation[j].uniqueString === str) {
                    while (foodItem.customisation[j].addOnQty--) {
                        $scope.removeItem(foodItem, addOnArr, isEditMode);
                        count++;
                    }
                }
            }
            addOnArr = angular.copy(updatedAddOnArr);
            while (count--) {
                $scope.addItem(foodItem, updatedAddOnArr);
            }
            $scope.cart = JSON.parse(localStorage.getItem('cart'));
        }
        $uibModalInstance.close();
    };
    $scope.cancelModal = function () {
        updatedAddOnArr = [];
        addOnArr = []
        $uibModalInstance.dismiss();

    };

    $scope.disabledBtn = function (addOnItem) {
        if (addOnItem.qty === addOnItem.maxQtyToBeAdded) {
            return true;
        }
    };

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

    $scope.addAddOnFunction = function (addOn2) {
        if (addOn2 !== null) {
            var obj = updatedAddOnArr.find(function (el) {
                if (el._id == addOn2._id)
                    return el;
            });
            if (obj) {
                obj.qty++;
            } else {
                addOn2.qty = 1;
                updatedAddOnArr.push(addOn2);
            }
            
            $scope.billInModalBox += addOn2.foodPrice;
        }
    };

    $scope.removeAddOnFunction = function (addOn2) {
        for (var i = 0; i < updatedAddOnArr.length; i++) {
            if (updatedAddOnArr[i]._id === addOn2._id) {
                updatedAddOnArr[i].qty--;
                $scope.billInModalBox -= updatedAddOnArr[i].foodPrice;
                if (updatedAddOnArr[i].qty == 0) {
                    updatedAddOnArr.splice(i, 1);
                }
                if (updatedAddOnArr.length == 0) {
                    $scope.billInModalBox = foodItem.foodPrice;
                }
            }
        }
    };


}]);