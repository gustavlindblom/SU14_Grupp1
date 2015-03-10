app.controller("genrelistController", ["$scope", "Genres", function ($scope, Genres) {
    console.log("genrelistController is working. Ja men det går fan inte att loopa ut skite på skärmen!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });
        Genres.get();
}]);

