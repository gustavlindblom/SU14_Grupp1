app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", "$route", function ($scope, Authors, $modal, $log, $route) {
    // Pagination properties
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    // Fetch authors data from database
    $scope.$on("gotAuthors", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
        $scope.totalItems = $scope.authors.length;
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    });
    Authors.get();

    // Reload list when changes occur
    $scope.$on("reloadList", function (event, data) {
        $route.reload();
    });

    // Slice the complete array and display only the ones
    // in the current page
    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    }

    // Open a detail view of an author
    $scope.open = function (view, author, action) {
        // The user pressed on an exisiting author, either to view edit or delete
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
        // The user wants to add a new author
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
}]);





