app.controller("bookModalController", ["$scope", "Books", "$modalInstance", "id", function ($scope, Books, $modalInstance, id) {

    $scope.$on("gotBook", function (event, data) {
        console.log("book modal controller: ", data);
        $scope.book = data;
    });

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };

    Books.get(id);

}]);