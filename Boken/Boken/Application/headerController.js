app.controller('headerController', ['$scope', '$location', 'Login', '$modal', function ($scope, $location, Login, $modal) {
    $scope.loginStatus = Login.loginStatus;

    $scope.GoTo = function (url) {
        $location.url(url);
    }

    $scope.open = function (id) {

        console.log(id);
        if (id == "book")
        {
            console.log("inne i bok");
            var modalInstance = $modal.open({
                templateUrl: 'partials/createBook.html',
                controller: 'createBookModalController',

                resolve: {

                }
            });
        }
        else if (id == "author")
        {
            var modalInstance = $modal.open({
                templateUrl: 'partials/createAuthor.html',
                controller: 'createAuthorModalController',

                resolve: {

                }
            });
        }
        else if (id == "genre")
        {
            var modalInstance = $modal.open({
                templateUrl: 'partials/createGenre.html',
                controller: 'createGenreModalController',

                resolve: {

                }
            });
        }
        

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };
   
}
]);

