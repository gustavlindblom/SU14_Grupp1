app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", function ($scope, Genres, $modal, $log) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t'); 
        $scope.genres = data;
        $scope.totalItems = $scope.genres.length;
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
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
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    }
    // ----------- slut på paginering -----//


    // ----- Modal ----------------------- //
   
    $scope.open = function (size, genre) {
        
			var modalInstance = $modal.open({
            templateUrl: 'partials/genreDetail.html',
            controller: 'genreDetailController',
            size : size,
            resolve: { 
                id: function () {
                    return genre.Id;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
         
            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //---------Slut Modal -------------------//

    Genres.get();

}]);
