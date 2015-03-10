app.controller("genrelistController", ["$scope", "Genres", function ($scope, Genres) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });
    

    $scope.showGenre = function (genre) {
        
        var name = genre{}
        
        console.log(name);

        

        //data is a string (value of textarea)
        var data = $scope.callData;

        //if user did not pick a url && method, abort
        if (!$scope.callUrl || !$scope.callMethod) {
            // if something is missing, notify user
            $scope.restMessage = "Please fill in all required fields!";
            return;
        }
    };

    Genres.get();

}]);
