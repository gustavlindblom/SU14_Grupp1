//app declaration and dependency injection
var app = angular.module("BookStore", ["ngRoute", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "genrelistController"
    })
    .when("/books", {
        templateUrl: "partials/booklist.html",
        controller: "bookformController"
    })
    .when("/genres", {
        templateUrl: "partials/genrelist.html",
        controller: "genrelistController"
    })
    .when("/authors", {
        templateUrl: "partials/authorlist.html",
        controller: "authorlistController"
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