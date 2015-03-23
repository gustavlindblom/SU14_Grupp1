app.controller("authorDetailController", ["$scope", "Authors", "$modalInstance", "param", function ($scope, Authors, $modalInstance, param) {

    $scope.view = param.view; // sätter viken vy som ska visas.
    $scope.action = param.view; // talar om vilken handling användaren vill utföra i modalen
    $scope.author = {};
    // --- Hämtar författaren ------ //
    $scope.$on("gotAuthor", function (event, data) {
        $scope.author = data;
    });
    Authors.get(param.id);
    // --- slut ---------------//

    // --- spara & Avbryt knapparnas funktioner -- //
    //     stänger även ner modalen 

    $scope.save = function () {
        Authors.put($scope.author.Id, $scope.author);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //-------------------------//

    // --- logik för att bestämma vad som skrivs ut i bekräftelse
    $scope.text = "";
    $scope.text2 = "";
    $scope.editText = function () {
        var a = $scope.action;
        var text = "Vill du verkligen "
        if (a == 1) text += "uppdatera "
        if (a == 4) text += "skapa "
        if (a == 3) text += "ta bort ";
        text += "författaren "

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
        Authors.post($scope.author);
        console.log("kommer detta före total items?");
        $modalInstance.close();
    };
    // ----------slut ------------------//

    // ----- Delete ------------------- //

    $scope.delete = function () {
        try {
            Authors.delete($scope.author.Id);
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
