app.controller('headerController', ['$scope', '$location', function ($scope, $location) { 
    $scope.GoTo = function (url) {
        $location.url(url);
    }
}
]);

