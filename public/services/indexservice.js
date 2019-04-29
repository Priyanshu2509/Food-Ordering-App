myApp.service('indexService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {
   
    var isToken = (localStorage.getItem('userToken'));
    this.logoutButtonFunction = function () {

        console.log(isToken);
        if (isToken == null) {
           logoutButtonDiv = false;
        } else {
            console.log("adlihfalihdf")
            logoutButtonDiv = true;
        }

        this.logoutFunction = function () {
            localStorage.clear();
            $location.path('/login');
        }
    }


}]);