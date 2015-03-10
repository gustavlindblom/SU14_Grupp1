app.controller("booklistController", ["$scope", "Books", function ($scope, Books) {
    console.log("books loaded");
    
    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
    });

    $scope.showBook = function (book) {

        $scope.textModal = book;

    };
     Books.get();

     
}]);




