app.controller("createBookModalController", ["$scope", "$modalInstance", function ($scope, $modalInstance) {


    $scope.addGenre = function () {
        document.getElementById('addGenreId').innerHTML += '<input class="input-group" placeholder="Genre..." style="font-style:italic;">';
    };
    
    $scope.addAuthor = function () {
        document.getElementById('addAuthorId').innerHTML += '<input class="input-group" placeholder="Namn..." style="font-style:italic;">';
    };

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };


}]);