//"myAppName" controller.
app.controller("homeController", ["$scope", "restService", "Books", function($scope, restService, Books) {
  console.log("I'm alive!");

  //using $rootScope.on to listen for new data from restCall .success()
  $scope.$on("restSuccess", function(event, data) {
    console.log("restSuccess triggered: ", data);
    $scope.output = JSON.stringify(data, null, '\t');
    $scope.books = data;
  });

  //CRUD (POST, GET, PUT, DELETE)
  $scope.restMethods = ["GET", "PUT", "POST", "DELETE"];

  //click handler for our form in the vie
  $scope.restCall = function() {
    //data is a string (value of textarea)
    var data = $scope.callData;

    //if user did not pick a url && method, abort
    if (!$scope.callUrl || !$scope.callMethod) {
      // if something is missing, notify user
      $scope.restMessage = "Please fill in all required fields!";
      return;
    }

    //send call and recieve true || false from restService method
    var callSent = restService.restCall($scope.callUrl, $scope.callMethod, data);

    //if callSent === true the request was sent with valid data
    if (callSent) {
      $scope.restMessage = false;
    } else {
      //else something must have been wrong with the data
      $scope.restMessage = "Bad request data!";
    }

  };

  //we can make models accessible to the entire app using $rootScope!
  //$scope.hello is set in restService helloWorld using $rootScope
  //console.log("rootScope1: ", $scope.hello);
  //restService.helloWorld();
  //console.log("rootScope2: ", $scope.hello);

  //a static GET request to see if our service is alive
  //restService.restCall("books", "GET", {});
  //replacing restService with Books (also a service)
  Books.get();
}]);
