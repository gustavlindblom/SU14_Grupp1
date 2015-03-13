app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", function ($scope, Authors, $modal, $log) {
    console.log("authors loaded");

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    

    $scope.showAuthor = function (author) {

        $scope.textModal = author;
        
    };
    // ----- Modal ----- //
    $scope.open = function (author) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorModal.html',
            controller: 'modalController',
            //size: size, 
            resolve: {
                items: function () {

                    return author;
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




