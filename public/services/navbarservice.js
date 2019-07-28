myApp.service('navbarService', ['$http', 'growl', '$state', '$q', function ($http, growl, $state, $q) {

    var isToken = (localStorage.getItem('userToken'));
    this.logoutButtonDiv = false;

    this.checkLogoutButton=function(){
    if(isToken){
        this.logoutButtonDiv = true;   
        return true;
    }}

    this.logoutFunction=function(){
        localStorage.clear();
        $state.go('login');
    //    $location.path('/login');
    }

    // console.log(this.logoutButtonDiv);

}]);