app.controller("booklistController", ["$scope", "Books", function ($scope, Books) {
    console.log("I'm a,mömömölmöllive!");
    
    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
    });
     Books.get();

     
}]);




