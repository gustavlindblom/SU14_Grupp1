app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", function ($scope, Genres, $modal, $log) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });



    // ----- Modal ----- //
   
    
    $scope.open = function (size, genre) {
        
         var modalInstance = $modal.open({
            templateUrl: 'partials/modal.html', 
            controller: 'modalController', 
            size : size,
            resolve: { 
                id: function () {
                    return genre.Id;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
         
            $scope.selected = selectedItem;
        }, function () {

        });
    };
    //----------------------------//

    Genres.get();

}]);
