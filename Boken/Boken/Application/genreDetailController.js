app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "id", function ($scope, Genres, $modalInstance, id) {
    console.log("")

    
    $scope.$on("gotGenre", function (event, data) {
        console.log("modal controller: ", data);
        $scope.genre = $scope.orgGenre = data;
        console.log("Skriver ut ny genre:", $scope.orgGenre)
    });
    $scope.orgGenre = angular.copy($scope.genre)
    
    

    $scope.save = function () {

        var orgGenre = $scope.orgGenre
        console.log("skriver ut från save orgGenre id: ", orgGenre.Id, "objektet: ", orgGenre)
        
        //console.log("skriver ut vad jag skíckar:", Genres.put(orgGenre.Id, orgGenre));



        $modalInstance.close();
    };
    
    $scope.cancel = function () {
        console.log("Kommer jag till cancel?");
        $modalInstance.dismiss('cancel');
    };

    Genres.get(id);

    $scope.editView = "0";
    $scope.editStatus = function (id) {
            if (id == 1) {
                $scope.editView = [id];
                console.log("edit id:1: " + $scope.editView);
                }
            if (id == 0) {
                $scope.editView = [id];
                console.log("edit id:0: " + $scope.editView);
               }
    };

}]);
