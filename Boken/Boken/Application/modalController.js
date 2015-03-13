app.controller("modalController", ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, genre) {
    
    $scope.genre = genre;
    

    $scope.ok = function () {
        
        $modalInstance.close();
    };
    
    $scope.cancel = function () {
        
        $modalInstance.dismiss('cancel');
    };
}]);