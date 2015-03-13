app.controller("modalController", ["$scope", "Genres", "$modalInstance", "id", function ($scope, Genres, $modalInstance, id) {
    
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