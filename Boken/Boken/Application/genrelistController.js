app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", function ($scope, Genres, $modal, $log) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });



    // ----- Modal ----- //
   
    
    $scope.open = function (genre) {
        
         var modalInstance = $modal.open({
            templateUrl: 'partials/modal.html', 
            controller: 'modalController', 
             
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
