app.controller("authorDetailController", ["$scope", "Authors", "$modalInstance", "param", function ($scope, Authors, $modalInstance, param) {

    $scope.view = param.view; // sätter viken vy som ska visas.
    $scope.action = param.view; // talar om vilken handling användaren vill utföra i modalen
    $scope.newAuthor = {};
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

    //---------skapa ny -------//
    $scope.create = function () {
        console.log($scope.newAuthor)
        Authors.post($scope.newAuthor);
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
        if (id == 1) { $scope.view = [id]; }
        if (id == 0) { $scope.view = [id]; }
        if (id == 2) { $scope.view = [id]; }
    };
    // --- slut ---------------------//

}]);
