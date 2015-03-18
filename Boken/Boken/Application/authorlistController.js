app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", function ($scope, Authors, $modal, $log) {
    console.log("authors loaded");

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
        $scope.totalItems = $scope.authors.length;
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    });

    // Början på paginering
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
    // slut på paginering
    

    // ----- Modal ----- //
    $scope.open = function (author) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorDetail.html',
            controller: 'authorDetailController',
            resolve: {
                id: function () {
                    return author.Id;
                }
            }
        });


        modalInstance.result.then(function (selectedItem) {


            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //----------------------------//

    Authors.get();
}]);




