app.controller('headerController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) { 
    $scope.GoTo = function (url) {
        $location.url(url);
    }
    $rootScope.DDtext = "Logga in";
    $rootScope.loggedin = "";
    $rootScope.loginStatus = function (id) {
        if (id == 1) {
            
            $rootScope.loggedin = [id];
            $rootScope.DDtext = "Admin";
            console.log("Admin: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
        else if (id == 2) {
            
            $rootScope.loggedin = [id];
            $rootScope.DDtext = "Lager"
            console.log("Lager: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
    };
}
]);

