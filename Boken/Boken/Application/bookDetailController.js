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

    $scope.$on("gotRating", function (event, data) {
        console.log("Rating: ", data);
        $scope.rating = data;
    });
    // --- slut ---------------//

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

    // ---- lägg till en ny inputrad varje gång man trycker på "plus tecknet" ----- //
    $scope.addGenre = function () {
        document.getElementById('addGenreId').innerHTML += '<input type="text" placeholder="Namn..." class="form-control" ng-model="book.Genres" style="font-style:italic;" id="bookGenre"></input>';
    };

    $scope.addAuthor = function () {
        document.getElementById('addAuthorId').innerHTML += '<input type="text" placeholder="Namn..." class="form-control" ng-model="book.Authors" style="font-style:italic;" id="bookAuthor"></input>';
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
