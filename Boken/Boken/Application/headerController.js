app.controller('headerController', ['$scope', '$location', 'Login', '$modal', function ($scope, $location, Login, $modal) {
    $scope.loginStatus = Login.loginStatus;

    $scope.GoTo = function (url) {
        $location.url(url);
    }

    $scope.openCreateBook = function () {

        var modalInstance = $modal.open({
            templateUrl: 'partials/createBook.html',
            controller: 'createBookModalController',

            resolve: {

            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
   
}
]);

