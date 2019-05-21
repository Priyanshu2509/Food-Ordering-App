myApp.service('restaurantService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

// this.getRestaurantsByCity= function(cityName){
//     var promise=$q.defer();

//       $http({
//               method: "GET",
//               url: "http://localhost:3000/allrestaurants/" + cityName,
//               data: {
//                   city: cityName
//               }
//           })
//           .then(function (response) {
//               promise.resolve(response);

//           }, function (error) {
//               promise.resolve(error);
              
//           });
//           return promise.promise;
// }


}]);