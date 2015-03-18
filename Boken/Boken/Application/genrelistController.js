app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", "$route", function ($scope, Genres, $modal, $log, $route) {
    console.log("genrelistController is working!");

    // -- Hämtar lista med genres -- //
    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t'); 
        $scope.genres = data;
        $scope.totalItems = $scope.genres.length;
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    });
    Genres.get();
    // --- slut ------------------------//

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
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    }
    // --- slut på paginering ----------//


    // ----- Modal -------------------- //
   
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
            console.log("Kommer vi hit någon gång?");
            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //---------Slut Modal -------------------//


    // ----- Delete ----------------------- //

    $scope.deleteGenre = function (genre) {

        if(confirm("Är du säker på att du vill ta bort denna Genre?"));
        {
            console.log("tar bort genre : ", genre);
            console.log("med id : ", genre.Id);
            try {
                Genres.delete(genre.Id);
                alert("Genren finns inte längre!");
            }
            catch (err) {
                alert("Något gick fel:  " + err);
            }
        }
        Genres.get();
        $route.reload();
    };

    //---------Slut delete -------------------//

    

}]);
