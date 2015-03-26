app.controller("genreDetailController", ["$scope", "Genres", "$modalInstance", "$modal", "param", function ($scope, Genres, $modalInstance, $modal, param) {
    $scope.view = param.view; // Set which CRUD-based view will be shown in  the modal
    $scope.action = param.view; // Only changes if the user changes what s/he wants to do in the modal
    $scope.genre = {};

    // Fetch genre information from the database
    $scope.$on("gotGenre", function (event, data) {
        $scope.genre = data;
    });
    if ($scope.view != 4) Genres.get(param.id); // Fetch data only if we're not in Create-mode
    
    // Create
    $scope.create = function () {
        Genres.post($scope.genre);
        $scope.$on("reloadList", function () {
            $modalInstance.close();
        });
    };

    // Update
    $scope.save = function () {
        Genres.put($scope.genre.Id, $scope.genre);
        $scope.$on("reloadList", function () {
            $modalInstance.close();
        });
    };

    // Delete
    $scope.delete = function () {
        try {
            Genres.delete($scope.genre.Id);
            $scope.$on("reloadList", function () {
                $modalInstance.close();
            });
        }
        catch (err) { // suppress any exceptions
        }
        $modalInstance.close();
    };

    // Dismiss the modal when the user clicks 'cancel'
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // Decide what will be printed in the confirmation window
    // depending on which mode the current user is in.
    $scope.text = "";
    $scope.text2 = "";
    $scope.editText = function () {
        var a = $scope.action;
        var text = "Vill du verkligen "
        if (a == 1) text += "uppdatera "
        if (a == 4) text += "skapa "
        if (a == 3) text += "ta bort ";
        text += "genren "

        var text2 = "";
        if (a != 3) text2 = "med följande innehåll?"
        if (a == 3) text2 = "och alla dess referenser permanent?";
        if (a == 4) text2 = "med dessa uppgifter?";
        $scope.text2 = text2;
        $scope.text = text;
    }

    // Toggle between different views
    $scope.editView = function (id) {
        if (id == 0) { $scope.view = [id]; } // Read
        if (id == 1) { $scope.view = [id]; } // Edit
        if (id == 2) { $scope.view = [id]; } // Confirmation
        if (id == 3) { $scope.view = [id]; } // Delete
        if (id == 4) { $scope.view = [id]; } // Create
    };

    // Opens a modal when the user clicks a book in the
    // "top rated books"-list
    $scope.openBook = function (view, book, action) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/bookDetail.html',
            controller: 'bookDetailController',
            resolve: {
                param: function () {
                    params = {
                        id: book.Id,
                        view: view,
                        action: action
                    }
                    return params;
                }
            }
        });
    };
}]);
