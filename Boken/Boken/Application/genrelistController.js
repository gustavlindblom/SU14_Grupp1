app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", function ($scope, Genres, $modal, $log) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });
    

    //$scope.open = function (size) {

    //    var modalInstance = $modal.open({
    //        templateUrl: "Partials/modal.html",
    //        controller: "modalController",
    //        size: size,
    //         resolve: {
    //            items: function () {
    //                //return $scope.items;
    //            }
    //        }
    //    });

    //        modalInstance.result.then(function (selectedItem) {
    //        $scope.selected = selectedItem;
    //    }, function () {
    //        $log.info('Modal dismissed at: ' + new Date());
    //    });
    //};

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'Partials/modal.html',
            controller: 'modalController',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };




    $scope.showGenre = function () {
        $scope.textModal = genre;
    };

    $scope.selectedGenre = function (genre) {
        console.log("Choosen category: " + genre.Name);
        return genre.Id;
    };

    Genres.get();

}]);
