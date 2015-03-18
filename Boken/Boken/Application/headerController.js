app.controller('headerController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) { 
    $scope.GoTo = function (url) {
        $location.url(url);
    }
    $rootScope.loggedin = "";
    $rootScope.loginStatus = function (id) {
        if (id == 1) {
            
            $rootScope.loggedin = [id];
            console.log("Admin: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
        else if (id == 2) {
            
            $rootScope.loggedin = [id];
            console.log("Slav: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
    };
}
]);

