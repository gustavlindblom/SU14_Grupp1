app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", "$route", function ($scope, Genres, $modal, $log, $route) {

    // -- Hämtar lista med genres -- //
    $scope.$on("gotGenres", function (event, data) {
        //console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
        $scope.totalItems = $scope.genres.length;
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    });
    Genres.get();
    // --- slut ------------------------//

    //--- Början på paginering ---------//
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.genres.slice($scope.startshow, $scope.endshow);
    }
    // --- slut på paginering ----------//


    // ----- Modal -------------------- //

    $scope.open = function ( genre, view) {
        console.log("genre", genre, "view", view);
        var modalInstance = $modal.open({
            templateUrl: 'partials/genreDetail.html',
            controller: 'genreDetailController',
            //size: size,
            resolve: {
                param: function () {
                    params = {
                        id: genre.Id,
                        view: view
                    }
                    console.log("param:", params)
                    return params;
                    }

                //    return genre.Id;
                //},
                //view: function () {
                //    //console.log("modal open editView: ", $scope.setEdit(loggedin));
                //    return view;
                //}
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log("Kommer vi hit någon gång?");
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


    // ----- Delete ----------------------- //

    $scope.deleteGenre = function (genre) {

        if (confirm("Är du säker på att du vill ta bort genren " + genre.Name + "?"));
        {
            console.log("tar bort genre : ", genre);
            console.log("med id : ", genre.Id);
            try {
                Genres.delete(genre.Id);
                alert("Genren" + genre.Name + "och dess referenser är borttagna.");
            }
            catch (err) {
                alert("Något gick fel:  " + err);
            }
        }
        Genres.get();
        $route.reload();
    };

    //---------Slut delete -------------------//



}]);
