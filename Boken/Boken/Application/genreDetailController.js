app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "param", function ($scope, Genres, $modalInstance, param) {

    $scope.view = param.view; // sätter viken vy som ska visa.

    // --- Hämtar genren ------ //
    $scope.$on("gotGenre", function (event, data) {
        $scope.genre = $scope.orgGenre = data;
     });
    Genres.get(param.id);
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

    // ----- Delete ----------------------- //

    $scope.delete = function () {
        
            try {
                Genres.delete($scope.genre.Id);
                alert("Genren" + $scope.genre.Name + "och dess referenser är borttagna.");
            }
            catch (err) {
                alert("Något gick fel:  " + err);
            }
        
            $modalInstance.close();
    };

    //---------Slut delete -------------------//







    
    // --- togglar redigeringsläge ---//
    
    $scope.editView = function (id) {
            if (id == 1) { $scope.view = [id]; }
            if (id == 0) { $scope.view = [id]; }
            if (id == 2) { $scope.view = [id]; }
    };
    // --- slut ---------------------//

}]);
