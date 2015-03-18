app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", "$location", function ($scope, Authors, $modal, $log, $location) {
    console.log("authors loaded");

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
        $scope.totalItems = $scope.authors.length;
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    });

    $scope.GoTo = function (url) {
        $location.url(url);
    }

    // Början på paginering
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.authors.slice($scope.startshow, $scope.endshow);
    }
    // slut på paginering
    

    // ----- Modal ----- //
    $scope.open = function (author) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorDetail.html',
            controller: 'authorDetailController',
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


    // ----- Delete ----------------------- //

    $scope.deleteAuthor = function (author) {

        if(confirm("Är du säker på att du vill ta bort denna författare?"));
        {
            console.log("tar bort FF : ", author);
            console.log("med id : ", author.Id);
            try {
                Authors.delete(author.Id);
                alert("Författaren finns inte längre!");
            }
            catch (err) {
                alert("Något gick fel:  " + err);
            }
        }

        console.log($scope.authors);
    };

    //---------Slut delete -------------------//

    
    Authors.get();
}]);




