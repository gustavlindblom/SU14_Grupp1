app.controller("bookDetailController", ["$scope", "Books", "Authors", "Genres", "Ratings", "$modalInstance", "param", function ($scope, Books, Authors, Genres, Ratings, $modalInstance, param) {

    $scope.view = param.view; // sätter viken vy som ska visas.
    $scope.action = param.view; // talar om vilken handling användaren vill utföra i modalen
    $scope.book = {};
    // --- Hämtar författaren ------ //
    $scope.$on("gotBook", function (event, data) {
        $scope.book = data;
        Ratings.get(data.Rating.Id);
    });
    Books.get(param.id);

    $scope.$on("gotGenres", function (event, data) {
        $scope.genres = data;

        console.log("genres i boketail wowokwko", $scope.genres);
    });

    Genres.get();

    $scope.$on("gotAuthors", function (event, data) {
        $scope.authors = data;
    });

    Authors.get();

    $scope.$on("gotRating", function (event, data) {
        console.log("Rating: ", data);
        $scope.rating = data;
    });
    // --- slut ---------------//

    // --- Sätt ett betyg på en bok --- //
    $scope.rate;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        console.log("vad är värder?", $scope.overStar);
    };
    $scope.setRating = function () {
        newRating = { Id: $scope.rating.Id, TotalRating: $scope.rate };
        Ratings.put(newRating.Id, newRating);
        Ratings.get(newRating.Id);
    }


    // --- spara & Avbryt knapparnas funktioner -- //
    //     stänger även ner modalen 

    $scope.save = function () {
        Books.put($scope.book.Id, $scope.book);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //-------------------------//



    // ---- rating ----- //

    $scope.maxRating = 10;
    $scope.isReadonly = true;

    //-------------------------//

    $scope.newGenres = [];
    // ---- lägg till en ny inputrad varje gång man trycker på "plus tecknet" ----- //
    $scope.addGenre = function (genre) {

        if ($scope.newGenres.indexOf(genre) >= 0) {
            return;
        }
        else {
            $scope.newGenres.push(genre);
        }
        console.log($scope.newGenres);
    };


    $scope.newAuthors = [];
    // ---- lägg till en ny inputrad varje gång man trycker på "plus tecknet" ----- //
    $scope.addAuthor = function (author) {

        if ($scope.newAuthors.indexOf(author) >= 0) {
            return;
        }
        else {
            $scope.newAuthors.push(author);
        }
        console.log($scope.newAuthors);
    };


    // --- logik för att bestämma vad som skrivs ut i bekräftelse
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
    }
    // ------------------------//

    //---------skapa ny -------//
    $scope.create = function () {
        $scope.book.Genres = $scope.newGenres;
        $scope.book.Authors = $scope.newAuthors;
        console.log("rewqrwq", $scope.book)
        Books.post($scope.book);
        $modalInstance.close();
    };
    // ----------slut ------------------//

    // ----- Delete ------------------- //

    $scope.delete = function () {
        try {
            Books.delete($scope.book.Id);
        }
        catch (err) {
        }
        $modalInstance.close();
    };

    //---------Slut delete -------------//

    // --- togglar mellan olika vyer ---//
    /*
     * View:
     *  0 - visa upp
     *  1 - redigering
     *  2 - bekräftelse
     *  3 - radera
     *  4 - skapa nytt
     * 
     */

    $scope.editView = function (id) {
        if (id == 0) { $scope.view = [id]; }
        if (id == 1) { $scope.view = [id]; }
        if (id == 2) { $scope.view = [id]; }
        if (id == 3) { $scope.view = [id]; }
        if (id == 4) { $scope.view = [id]; }
        if (id == 5) { $scope.view = $scope.action; }
    };
    // --- slut ---------------------//

}]);
