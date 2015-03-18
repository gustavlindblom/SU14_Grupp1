app.controller('headerController', ['$scope', '$location', 'Login', function ($scope, $location, Login) {
    $scope.loginStatus = Login.loginStatus;

    $scope.GoTo = function (url) {
        $location.url(url);
    }
   
}
]);

