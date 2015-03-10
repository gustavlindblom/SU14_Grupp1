app.controller("authorlistController", ["$scope", "Authors", function ($scope, Authors) {
    console.log("authors loaded");

    $scope.$on("gotAuthorlist", function (event, data) {
        console.log("gotAuthorlists triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    Authors.get();


}]);




