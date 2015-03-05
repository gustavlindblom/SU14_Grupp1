//app declaration and dependency injection
var app = angular.module("myAppName", ["ngRoute", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/add-book", {
        templateUrl: "partials/bookform.html",
        controller: "bookformController"
    })
    .otherwise({
      redirectTo: "/"
    });

  //$locationProvider.html5Mode(true);
}]);