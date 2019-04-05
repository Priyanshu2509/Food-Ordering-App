myApp.controller('viewRestaurantController', ['$scope', '$http' ,'$routeParams', '$location', 'appService',
    function ($scope, $http, $routeParams, $location, appService) {

        $scope.currentRestaurantId = $routeParams.currentRestaurant;
        $scope.currentCity = $routeParams.currentCity;
        console.log($scope.currentRestaurantId);

        // $scope.cart = appService.cart;

        // $scope.menuList = null;
        // $scope.currentCategory = null;
        // $scope.currentSubCategory = null;
        // $scope.foodItemDisplay = null;

        // $scope.IsVisible = true; //cart

        // $scope.IsVisibleDiv = false; //init
        // $scope.tax = {} ; 

        $http({
            method: "GET",
            url: "http://localhost:3000/allrestaurants/" + $scope.currentCity +  $scope.currentRestaurantId,
            data:{
                city:  $scope.currentCity,
                restaurantId:  $scope.currentRestaurantId
            }
        })
        .then(function (response) {
            console.log(response, 'res');
            // $scope.restaurantsList= response.data.restaurants;
            // console.log($scope.restaurantsList);
            $location.path('/restaurants/'+ $scope.currentCity + $scope.currentRestaurantId);
        },function (error){
            console.log(error, 'can not get data.');
            $location.path('/restaurants/'+ $scope.currentCity);
        });

        // $scope.filterFn = function (obj) {
        //     return false; // otherwise it won't be within the results
        // };

        //find restaurant description
    //     $scope.getDescription = function () {

    //         var desc = null;

    //         for (var i = 0; i < appService.data.length; i++) {
    //             for (var j = 0; j < appService.data[i].restaurantDetails.length; j++) {

    //                 if (appService.data[i].restaurantDetails[j].restaurantName == $scope.restaurant) {
    //                     desc = appService.data[i].restaurantDetails[j].restaurantDescription;
    //                 }
    //             }
    //         }
    //         return desc;
    //     }

    //     //get menulist by restaurant
    //     for (var i = 0; i < appService.data.length; i++) {
    //         for (var j = 0; j < appService.data[i].restaurantDetails.length; j++) {

    //             if (appService.data[i].restaurantDetails[j].restaurantName == $scope.restaurant) {
    //                 $scope.menuList = appService.data[i].restaurantDetails[j].foodMenu;

    //             }
    //         }
    //     }




    //     //get current category chosen
    //     $scope.getCurrentCategory = function (item) {
    //         $scope.currentCategory = item;

    //         for (var i = 0; i < $scope.menuList.length; i++) {
    //             if ($scope.menuList[i].categoryName == $scope.currentCategory) {

    //                 $scope.currentSubCategory = $scope.menuList[i].subCategory[0].subCategoryName;
    //                 $scope.foodItemDisplay = $scope.menuList[i].subCategory[0].subCategoryItems;

    //             }
    //         }

    //     }

    //     $scope.getCurrentCategory = function () {
    //         return $scope.currentCategory;

    //     }

    //     $scope.getCurrentSubCategory = function () {
    //         return $scope.currentSubCategory;

    //     }

    //     //veg check box
    //     $scope.vegCheckboxFunc = function (item) {

    //         for (var i = 0; i < $scope.menuList.length; i++) {
    //             console.log(item);
    //             if ($scope.menuList[i].categoryName == item) {
    //                 $scope.currentCategory = item;
    //             }

    //         }

    //     }

    //     //ng-init function load data
    //     $scope.loadData = function () {

    //         $scope.foodItemDisplay = $scope.menuList[0].subCategory[0].subCategoryItems;
    //         $scope.currentCategory = $scope.menuList[0].categoryName;
    //         $scope.currentSubCategory = $scope.menuList[0].subCategory[0].subCategoryName;

    //     }

    //     var temp2={};
    //     var ob2=null;

    //     //retrieve fooditems by restaurant name
    //     $scope.retrieveItem = function (item) {

    //         for (var i = 0; i < $scope.menuList.length; i++) {
    //             for (var j = 0; j < $scope.menuList[i].subCategory.length; j++) {

    //                 if (($scope.menuList[i].subCategory[j].subCategoryName == item)) {

    //                     $scope.currentSubCategory = item;
    //                     $scope.currentCategory = $scope.menuList[i].categoryName;




    //                 }
                    
    //             }
    //         }
    //     }

    //     $scope.mconsole = function(){
    //         console.log($scope.selected);
    //     }
    //     $scope.arr=[];
    //     for (var i = 0; i < $scope.menuList.length; i++) {
    //         for (var j = 0; j < $scope.menuList[i].subCategory.length; j++) {
    //             for (var k = 0; k < $scope.menuList[i].subCategory[j].subCategoryItems.length; k++) {
    //                 var temp2={};
    //                 var ob2= $scope.menuList[i].subCategory[j].subCategoryItems[k];
    //                 // temp2[ob2.foodName]=ob2;
    //                 temp2.name = ob2.foodName;
    //                 temp2.obj = ob2;
                    
    //                 console.log("temp2", temp2);

    //                 $scope.arr.push(temp2);
                    

    //             }
    //         }
    //     } 

    //     console.log($scope.arr);

    //     $scope.clearData=function(){
    //         $scope.selected='';
    //     }
        

    //     var temp = {};
    //     var obj ;

    //     //Add new item in cart
    //     $scope.addItem = function (itemToAdd) {
    //         $scope.IsVisible = $scope.IsVisible ? false : true;
    //         console.log(itemToAdd);
    //         console.log(itemToAdd.foodId);
    //         $scope.IsVisible = false;

    //         $scope.selected=itemToAdd.foodName;

    //         var o = $scope.cart.find(function (el) {
    //             console.log(el);
    //             return el.foodId == itemToAdd.foodId;;
    //         });

    //         if (o) {
    //             console.log(o.qty);
    //             o.qty++;
    //             console.log(o.qty);
    //         } else {
    //             itemToAdd.qty++;
    //             $scope.cart.push((itemToAdd));
    //         }

    //         console.log($scope.cart);

                
    //             for (var i = 0; i < itemToAdd.tax.length; i++) {
    //                 obj = itemToAdd.tax[i];

    //                 if (!temp[obj.taxName]) {
    //                     temp[obj.taxName] = obj.taxValue;
    //                 } else {
    //                     console.log("obj",obj);
                        
    //                     temp[obj.taxName] += ((obj.taxValue/100)*itemToAdd.foodPrice);
    //                 }
    //             }

    //             $scope.tax =temp;

    //     }

    //     //calculate subtotal cost of cart
    //     $scope.getSubTotalCost = function () {
    //         $scope.subTotalCost = null;
    //         for (var i = 0; i < $scope.cart.length; i++) {
    //             $scope.subTotalCost = $scope.subTotalCost + ($scope.cart[i].foodPrice * $scope.cart[i].qty);
    //         };
    //         return $scope.subTotalCost;
    //     }

    //     //calculate total cost
    //     $scope.getTotalCost = function () {
    //         $scope.totalCost = null;
    //         console.log($scope.totalCost);
    //         $scope.totalCost = 0 ;
    //         console.log($scope.tax);
    //         for(var i in $scope.tax){
    //             console.log(i);
    //             console.log($scope.tax[i] );
    //             $scope.totalCost += Number($scope.tax[i]);
    //         }
    //         return $scope.totalCost  += $scope.subTotalCost ;
    //     }

    //     //remove item from cart
    //     $scope.removeItem = function (itemToRemove) {

    //         for (var j = 0; j < $scope.cart.length; j++) {
    //             if ($scope.cart[j].foodId == itemToRemove.foodId) {
    //                 console.log($scope.cart);
    //                 $scope.cart[j].qty--;

    //                 if ($scope.cart[j].qty == 0) {
    //                     var index = $scope.cart.indexOf(itemToRemove);
    //                     $scope.cart.splice(index, 1);
    //                 }
    //             }
    //         }

    //         if ($scope.cart.length == 0) {
    //             $scope.IsVisible = true;
    //         }
    //     }

    }
]);