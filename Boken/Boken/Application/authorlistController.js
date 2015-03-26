app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", "$route", function ($scope, Authors, $modal, $log, $route) {

    // -- Hämtar lista med författare -- //
    $scope.$on("gotAuthors", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
        $scope.totalItems = $scope.authors.length;
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    });
    Authors.get();
    // --- slut ------------------------//
    $scope.$on("reloadList", function (event, data) {
        $route.reload();
    });

    //--- Början på paginering ---------//
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    }
    // --- slut på paginering ----------//

    // ----- Modal -------------------- //

    $scope.open = function (view, author, action) {
        console.log("author", author, "view", view);

        if (author) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/authorDetail.html',
                controller: 'authorDetailController',
                resolve: {
                    param: function () {
                        params = {
                            id: author.Id,
                            view: view,
                            action: action
                        }
                        console.log("param:", params)
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
        if (!author) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/authorDetail.html',
                controller: 'authorDetailController',
                resolve: {
                    param: function () {
                        params = {
                            view: view,
                            action: action
                        }
                        console.log("param:", params)
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
    //---------Slut Modal -------------------//

}]);





