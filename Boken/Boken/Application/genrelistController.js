app.controller("genrelistController", ["$scope", "Genres", "$modal", "$log", function ($scope, Genres, $modal, $log) {
    console.log("genrelistController is working!");

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t'); 
        $scope.genres = data;
    });

    //  ------------ Mikael Testar ---------------//

    //$scope.utdrag = function (data) {
    //    var genres = [];

    //    console.log("innan: ", data)

    //    for (genre in data) {
    //        var utdrag = genre.Description.substring(0, 20);
    //        genre.Description = utdrag
    //    }

    //    console.log("efter: ", data)

    //};

    
    ////$scope.test =
    //$scope.utdrag = function (genre) {
    //    // test = substring(0, genre.Description.indexOf(".", 50));
    //    var p = genre;
    //    var test = genre.Description.substring(0, 20);
    //    console.log("utdrag :", test);
    //    $scope.mikael = test;
    //};



    //utdrag();
        
  //  console.log(utdrag);
    //create an excert of the post message (minimum 50 characters long)
  //  var excerpt = item.message.substring(0, item.message.indexOf(".", 50));
  //  tableRowHtml.append('<td>' + excerpt + '...</td>');




    // -------------------------------------------//




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
