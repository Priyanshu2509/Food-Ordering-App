myApp.service('navbarService', ['$http', 'growl', '$location', '$q', function ($http, growl, $location, $q) {

    var isToken = (localStorage.getItem('userToken'));
    this.logoutButtonDiv = false;

    this.checkLogoutButton=function(){
    if(isToken){
        this.logoutButtonDiv = true;   
        return true;
    }}

    this.logoutFunction=function(){
        localStorage.clear();
       $location.path('/login');
    }

    console.log(this.logoutButtonDiv);

}]);