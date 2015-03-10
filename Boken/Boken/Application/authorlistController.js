app.controller("authorlistController", ["$scope", "Authors", function ($scope, Authors) {
    console.log("authors loaded");

    $scope.$on("restSuccess", function (event, data) {
        console.log("restSuccess triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    Authors.get();


}]);




