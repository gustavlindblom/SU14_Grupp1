app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", function ($scope, Authors, $modal, $log) {
    console.log("authors loaded");

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    

    // ----- Modal ----- //
    $scope.open = function (author) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorModal.html',
            controller: 'authorModalController',
            resolve: {
                id: function () {
                    return author.Id;
                }
            }
        });


        modalInstance.result.then(function (selectedItem) {


            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //----------------------------//

    Authors.get();
}]);




