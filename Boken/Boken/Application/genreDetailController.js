app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "id", function ($scope, Genres, $modalInstance, id) {
    console.log("")
    $scope.$on("gotGenre", function (event, data) {
        console.log("modal controller: ", data);
        $scope.genre = data;
    });

    $scope.ok = function () {
        
        $modalInstance.close();
    };
    
    $scope.cancel = function () {
        
        $modalInstance.dismiss('cancel');
    };

    Genres.get(id);
}]);