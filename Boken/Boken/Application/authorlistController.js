app.controller("authorlistController", ["$scope", "Authors", "$modal", "$log", "$location", "$route", function ($scope, Authors, $modal, $log, $location, $route) {
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
    
    $scope.open = function (author, view) {
        console.log("author", author, "view", view);
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorDetail.html',
            controller: 'authorDetailController',
            //size: size,
            resolve: {
                param: function () {
                    params = {
                        id: author.Id,
                        view: view
                    }
                    console.log("param:", params)
                    return params;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log("Kommer vi hit någon  gång gång?");
            Authors.get();
            $route.reload();
            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //---------Slut Modal -------------------//
    $scope.setEdit = function (loggedin) {
        if (loggedin == 1) {
            return 1;
        }
        else {
            return 0;
        };
    };

    // ----- Modal ----- //
    //$scope.open = function (author) {
    //    var modalInstance = $modal.open({
    //        templateUrl: 'partials/authorDetail.html',
    //        controller: 'authorDetailController',
    //        resolve: {
    //            id: function () {
    //                return author.Id;
    //            }
    //        }
    //    });


    //    modalInstance.result.then(function (selectedItem) {
    //        $scope.selected = selectedItem;
    //    }, function () {

    //    });
    //};
    //----------------------------//


    // ----- Delete ----------------------- //

    $scope.deleteAuthor = function (author) {

        if(confirm("Är du säker på att du vill ta bort" + author.Name + "och alla böcker han/hon skrivit?"));
        {
            console.log("tar bort FF : ", author);
            console.log("med id : ", author.Id);
            try {
                Authors.delete(author.Id);
                alert("Författaren " + author.Name + " och hans/hennes böcker är borttagna.");
            }
            catch (err) {
                alert("Något gick fel:  " + err);
            }
        }
        Authors.get();
        $route.reload();
    };

    //---------Slut delete -------------------//

    
    Authors.get();
}]);




