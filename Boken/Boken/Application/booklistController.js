app.controller("booklistController", ["$scope", "Books", function ($scope, Books) {
    console.log("booklistController is working!");

    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
    });

    ////CRUD (POST, GET, PUT, DELETE)
    //$scope.restMethods = ["get", "put", "post", "delete"];

    ////click handler for our form in the view
    //$scope.bookRestCall = function (method, data) {

    //    if (method === "get") {
    //        Books.get();
    //    }
    //    if (method === "put") {
    //        Books.put(data);
    //    }
    //    if (method === "post") {
    //        Books.post(data);
    //    }
    //    if (method === "delete") {
    //        Books.delete(data);
    //    }
    //    else {
    //        console.log("Skriv rätt, för fan!");
    //    }
    //    //send call and recieve true || false from restService method
    //    var callSent = restService.restCall($scope.callUrl, $scope.callMethod, data);




    //    //if callSent === true the request was sent with valid data
    //    if (callSent) {
    //        $scope.restMessage = false;
    //    } else {
    //        //else something must have been wrong with the data
    //        $scope.restMessage = "Bad request data!";
    //    }

    //};
    Books.get();


}]);




