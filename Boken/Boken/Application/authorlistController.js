app.controller("authorlistController", ["$scope", "Authors", function ($scope, Authors) {
    console.log("authors loaded");

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    

    $scope.showAuthors = function (author) {

        $scope.textModal = author;
        
    };
    Authors.get();
}]);




