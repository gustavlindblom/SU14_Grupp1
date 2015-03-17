app.controller("pageController", ["$scope", function ($scope) {
    $scope.$on("gotBooks", function (event, data) {
        $scope.TotalItems = data.length;          // nytt! Funkar, fanimej!
        console.log("TotalItems: " + $scope.TotalItems);
    });

    $scope.$on("gotGenres", function (event, data) {
        $scope.TotalItems = data.length;
        console.log("TotalItems: " + $scope.TotalItems);
    });

    $scope.$on("gotAuthors", function (event, data) {
        $scope.TotalItems = data.length;
        console.log("TotalItems: " + $scope.TotalItems);
    });

    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);
    console.log($scope.startshow, $scope.endshow);

    $scope.$watch("bigCurrentPage", function (newValue, oldValue) {     // bigCurrentPage ändras aldrig. FAN!
        console.log("bigCurrentPage: ", newValue, oldValue);
        $scope.bigCurrentPage = newValue;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = $scope.startshow + ($scope.itemsPP - 1);
        console.log("Displaying: " + $scope.startshow + " - " + $scope.endshow);
        $scope.$on("gotBooks", function () {
            $scope.pagArr = $scope.books.slice($scope.startshow, $scope.endshow + 1);
        });
        console.log("pagArr: ", $scope.pagArr);
    });

    app.filter('slice', function () {
        return function (arr, start, end) {
            return arr.slice(start, end);
        };
    });

    var pageChanged = function () {
        $scope.bigCurrentPage = $scope.newValue;
        console.log($scope.bigCurrentPage);
    }
}]);