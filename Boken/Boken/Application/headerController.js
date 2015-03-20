app.controller('headerController', ['$scope', '$location', 'Login', '$modal', function ($scope, $location, Login, $modal) {
    $scope.loginStatus = Login.loginStatus;

    $scope.GoTo = function (url) {
        $location.url(url);
    }

    // ------- Öppna vy för att skapa bok ---- //
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
    // --------------------------------------//

    // ----- öppna vy för att skapa ny genre--- //

    //$scope.createNewGenre = function ( view) {
    //    //console.log("genre", genre, "view", view);
    //    var modalInstance = $modal.open({
    //        templateUrl: 'partials/genreDetail.html',
    //        controller: 'genreDetailController',
    //        //size: size,
    //        resolve: {
    //            param: function () {
    //                params = {
    //                    view: view
    //                }
    //                console.log("param:", params)
    //                return params;
    //            }
    //        }
    //    });

    //    modalInstance.result.then(function (selectedItem) {
    //        console.log("Kommer vi hit någon  gång gång?");
    //        Genres.get();
    //        $route.reload();
    //        $scope.selected = selectedItem;
    //    }, function () {

    //    });
    //};
    //---------Slut ---- -------------------//
}
]);

