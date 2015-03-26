app.controller("bookDetailController", ["$scope", "Books", "Authors", "Genres", "Ratings", "$modalInstance", "param", function ($scope, Books, Authors, Genres, Ratings, $modalInstance, param) {
    // Modal properties
    $scope.view = param.view; // Set which CRUD-based view will be shown in  the modal
    $scope.action = param.view; // Only changes if the user changes what s/he wants to do in the modal

    // Book data
    $scope.book = {};
    $scope.newGenres = [];  // In this controller we use a middle array for authors and genres to make our
    $scope.newAuthors = []; // lives easier when editing/creating books.

    // Rating properties
    $scope.maxRating = 10;
    $scope.isReadonly = true;

    // Get the current year
    $scope.currDate = new Date().getFullYear();

    // Fetch book from the database
    $scope.$on("gotBook", function (event, data) {
        $scope.book = data;

        // Fill the middle arrays with the books authors/genres
        $scope.newAuthors = $scope.book.Authors;    
        $scope.newGenres = $scope.book.Genres;

        // Fetch the rating for the book
        Ratings.get(data.Rating.Id);
    });
    if ($scope.view != 4) Books.get(param.id); // Fetch the book only if the user is NOT creating a new

    // Fetch genres from the database
    $scope.$on("gotGenres", function (event, data) {
        $scope.genres = data;
    });
    if ($scope.view == 1 || $scope.view == 4) Genres.get(); // Fetch genres only if the user is in create/edit modes

    // Fetch authors from the database
    $scope.$on("gotAuthors", function (event, data) {
        $scope.authors = data;
    });
    if ($scope.view == 1 || $scope.view == 4) Authors.get(); // Fetch authors only if the user is in create/edit modes

    // Fetch book rating from the database
    $scope.$on("gotRating", function (event, data) {
        $scope.rating = data;
    });

    // Create
    $scope.create = function () {
        $scope.book.Genres = $scope.newGenres;
        $scope.book.Authors = $scope.newAuthors;
        Books.post($scope.book);
        $scope.$on("reloadList", function () {
            $modalInstance.close();
        });
    };

    // Edit
    $scope.save = function () {
        $scope.book.Genres = $scope.newGenres;
        $scope.book.Authors = $scope.newAuthors;
        Books.put($scope.book.Id, $scope.book);
        $scope.$on("reloadList", function () {
            $modalInstance.close();
        });
    };

    // Delete
    $scope.delete = function () {
        try {
            Books.delete($scope.book.Id);
            $scope.$on("reloadList", function () {
                $modalInstance.close();
            });
        }
        catch (err) {
        }
        $modalInstance.close();
    };

    // Dismiss the modal when the user clicks cancel
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // Update the rating in the database based upon the last vote
    $scope.setRating = function () {
        newRating = { Id: $scope.rating.Id, TotalRating: $scope.rating.AverageRating };
        Ratings.put(newRating.Id, newRating);
        Ratings.get(newRating.Id);
    }

    // Everytime the user clicks the plus icon, add a new row to allow multiple authors
    // and genres
    $scope.addAuthor = function (author) {

        if ($scope.newAuthors.indexOf(author) >= 0) {
            return;
        }
        else {
            $scope.newAuthors.push(author);
        }
    };

    $scope.addGenre = function (genre) {

        if ($scope.newGenres.indexOf(genre) >= 0) {
            return;
        }
        else {
            $scope.newGenres.push(genre);
        }
        console.log($scope.newGenres);
    };

    // Remove a row (author/genre) each time the user clicks
    // the minus icon
    $scope.removeSelectAuthor = function (selectedRemove) {
        var index = $scope.newAuthors.indexOf(selectedRemove);
        if (index > -1) {
            $scope.newAuthors.splice(index, 1);
        }
    };

    $scope.removeSelectGenre = function (selectedRemove) {
        var index = $scope.newGenres.indexOf(selectedRemove);
        if (index > -1) {
            $scope.newGenres.splice(index, 1);
        }
    };

    // Build the confirmation message
    $scope.text = "";
    $scope.text2 = "";
    $scope.editText = function () {
        var a = $scope.action;
        var text = "Vill du verkligen "
        if (a == 1) text += "uppdatera "
        if (a == 4) text += "skapa "
        if (a == 3) text += "ta bort ";
        text += "boken "

        var text2 = "";
        if (a != 3) text2 = "med foljande innehall?"
        if (a == 3) text2 = "och alla hans/hennes böcker permanent?";
        if (a == 4) text2 = "med dessa uppgifter?";
        $scope.text2 = text2;
        $scope.text = text;
    };

    // Toggle between different views modes
    $scope.editView = function (id) {
        if (id == 0) { $scope.view = [id]; } // Read
        if (id == 1) { $scope.view = [id]; $scope.action = 1; } // Edit
        if (id == 2) { $scope.view = [id]; } // Confirmation
        if (id == 3) { $scope.view = [id]; } // Delete
        if (id == 4) { $scope.view = [id]; } // Create
    };
}]);
