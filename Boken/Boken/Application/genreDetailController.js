app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "id", function ($scope, Genres, $modalInstance, id) {
    
    $scope.editView = "0"; // sätter redigeringsläge till false.

    // --- Hämtar genren ------ //
    $scope.$on("gotGenre", function (event, data) {
        $scope.genre = $scope.orgGenre = data;
     });
    Genres.get(id);
    // --- slut ---------------//

    // --- spara & Avbryt knapparnas funktioner -- //
    $scope.save = function () {
        Genres.put($scope.genre.Id, $scope.genre);
         $modalInstance.close();
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //-------------------------//
    
    // --- togglar redigeringsläge ---//
    
    $scope.editStatus = function (id) {
            if (id == 1) {
                $scope.editView = [id];
                }
            if (id == 0) {
                $scope.editView = [id];
               }
    };
    // --- slut ---------------------//

}]);
