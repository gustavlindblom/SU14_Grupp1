app.controller('headerController', ['$scope', '$location', function ($scope, $location) { 
    $scope.GoTo = function (url) {
        $location.url(url);
    }

    $rootScope.loginStatus = function (id) {
        if (id == 1) {
            
            var loggedin = [id];
            console.log("Admin: " + loggedin);
            return loggedin;
        }
        else if (id == 2) {
            
            var loggedin = [id];
            console.log("Slav: " + loggedin);
            return loggedin;
        }
    };
}
]);

