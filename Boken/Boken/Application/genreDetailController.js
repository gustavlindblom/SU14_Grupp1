app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "param", function ($scope, Genres, $modalInstance, param) {

    $scope.view = param.view; // sätter viken vy som ska visa.
    $scope.action = param.action; // talar om vilken handling användaren vill utföra i modalen (1 = edit, 3 = delete, 4 = create)
    $scope.newGenre = {};
    // --- Hämtar genren ------ //
    $scope.$on("gotGenre", function (event, data) {
        $scope.genre = $scope.orgGenre = data;
     });
    Genres.get(param.id);
    // --- slut ---------------//

    // --- spara & Avbryt knapparnas funktioner -- //
    //     stänger även ner modalen 

    $scope.save = function () {
        Genres.put($scope.genre.Id, $scope.genre);
        $modalInstance.close();
         
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //-------------------------//

    //---------skapa ny -------//
    $scope.create = function () {
        console.log($scope.newGenre)
        Genres.post($scope.newGenre);
        //$scope.view = 2;    // niklas
        $modalInstance.close();
    };
    // ----------slut ------------------//

    // ----- Delete ------------------- //

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

    //---------Slut delete -------------//

    // --- togglar mellan olika vyer ---//
    /*
     * View:
     *  0 - visa upp
     *  1 - redigering
     *  2 - bekräftelse
     *  3 - radera
     *  4 - skapa nytt
     * 
     */
      
    $scope.editView = function (id) {
            if (id == 1) { $scope.view = [id]; }
            if (id == 0) { $scope.view = [id]; }
            if (id == 2) { $scope.view = [id]; }
    };
    // --- slut ---------------------//

}]);
