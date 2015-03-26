app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", "$route", function ($scope, Genres, $modal, $log, $route) {
    // Pagination properties
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    // Fetch genres data from database
    $scope.$on("gotGenres", function (event, data) {
        $scope.genres = data;
        $scope.totalItems = $scope.genres.length;
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    });
    Genres.get();

    // Reload the list when changes occur
    $scope.$on("reloadList", function (event, data) {
        $route.reload();
    });

    // Splice the list of genres depending on current page
    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    }

    // Open a modal view of a genre if the user clicks it, or wants to edit/create/delete
    $scope.open = function ( view,  genre, action ) {
        if (genre) { // the user wants to view an existing book, or edit/delete
            var modalInstance = $modal.open({
                templateUrl: 'partials/genreDetail.html',
                controller: 'genreDetailController',
                resolve: {
                    param: function () {
                        params = {
                            id: genre.Id,
                            view: view,
                            action: action
                        }
                        return params;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $route.reload();
                $scope.selected = selectedItem;
            }, function () {
            });
        }
        if (!genre) { // The user wants to create a new book
             var modalInstance = $modal.open({
                    templateUrl: 'partials/genreDetail.html',
                    controller: 'genreDetailController',
                    resolve: {
                        param: function () {
                            params = {
                                view: view,
                                action: action
                            }
                            return params;
                        }
                    }
                });            
            modalInstance.result.then(function (selectedItem) {
                $route.reload();
                $scope.selected = selectedItem;
            }, function () {
            });
        }
    };
}]);
