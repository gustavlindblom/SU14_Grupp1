
app.service("restService", ["$http", "$rootScope", "$location", function ($http, $rootScope, $location) {

    function checkData(data) {
        console.log("typeof", typeof data);
        if (typeof data == "String") {
            try {
                //try to convert string to JSON (JS object)
                eval("data=" + data);
                return data;
            } catch (ee) {
                //and if we fail, notify user
                return false;
            }
        }
    }

    var restServant = {

        restCall: function (url, method, data, broadcastName) {
            if (method != "GET" && method != "DELETE") {
                //using a function only accessible INSIDE our service
                //to check if data is valid
                //data = checkData(data);             // kommenterade in detta (ns)
            }
            if (data === false) {
                //if data is not valid (FALSE), return false
                //$http({ url: "/partials/error.html"})
                //$rootScope.GoTo("'/error'");
                return false;
            }

            //if data passed inspection, send our AJAX REST request
            $http({
                url: "/api/" + url,
                method: method,
                data: data,
                responseType: "json"
            }).success(function (data) {
                $rootScope.thrownError = "";
                $rootScope.msg = "";

                //om broadcastName har ett namn, använd det, annars "restSuccess"
                broadcastName = broadcastName ? broadcastName : "restSuccess";
                //console.log("restCall success: ", data, " now broadcasting on: ", broadcastName);
                $rootScope.$broadcast(broadcastName, data);
                // (all "listeners" have now recieved our stringified data)
            }).error(function (data, thrownError) {
                console.log("Errormessage: ", data, thrownError);
                if (method == "GET") {
                    $location.url('/error');
                }

                var msg = "";
                if (thrownError == 401) {
                    msg = "unauthorized";
                }
                else if (thrownError == 400) {
                    msg = "bad request";
                }
                else if (thrownError == 403) {
                    msg = "forbidden";
                }
                else if (thrownError == 404) {
                    msg = "not found";
                }
                else if (thrownError == 500) {
                    msg = "internal server error";
                }
                else if (thrownError == 0) {
                    msg = "starta VS!!!";
                }
                else {
                    msg = "Google it, bi-yatch";
                };

                $rootScope.thrownError = thrownError;
                $rootScope.msg = msg;

                setTimeout(function () {
                    $rootScope.$broadcast("gotError");
                }, 200);
            });

            //return true for logical purposes in the controller
            return true;
        }
    };

    //AngularJS services MUST return objects,
    //which is why we had to build restServant
    return restServant;
}]);

//creating Books service
app.service("Books", ["restService", function (restService) {
    var bookServant = {
        get: function (Id) {
            var broadcast = Id ? "gotBook" : "gotBooks";
            var restUrl = Id ? "books/" + Id : "books/";
            restService.restCall(restUrl, "GET", {}, broadcast);
        },
        post: function (data) {
            var restUrl = "books/";
            restService.restCall(restUrl, "POST", data, "reloadList");
        },
        put: function (Id, data) {
            var restUrl = "books/" + Id;
            restService.restCall(restUrl, "PUT", data, "reloadList");
        },
        delete: function (Id) {
            var restUrl = "books/" + Id;
            restService.restCall(restUrl, "DELETE", {}, "reloadList");
        }
    };

    return bookServant;
}]);

// creating Genres service (ns)
app.service("Genres", ["restService", function (restService) {
    var genreServant = {
        get: function (Id) {
            var broadcast = Id ? "gotGenre" : "gotGenres";
            var restUrl = Id ? "genres/" + Id : "genres/";
            restService.restCall(restUrl, "GET", {}, broadcast);
        },
        post: function (data) {
            var restUrl = "genres/";
            restService.restCall(restUrl, "POST", data, "reloadList");
        },
        put: function (Id, data) {
            var restUrl = "genres/" + Id;
            restService.restCall(restUrl, "PUT", data, "reloadList");
        },
        delete: function (Id) {
            var restUrl = "genres/" + Id;
            restService.restCall(restUrl, "DELETE", {}, "reloadList");
        }
    };
    return genreServant;
}]);


//creating Authors service
app.service("Authors", ["restService", function (restService) {
    var authorServant = {
        get: function (Id) {
            var broadcast = Id ? "gotAuthor" : "gotAuthors";
            var restUrl = Id ? "authors/" + Id : "authors/";
            restService.restCall(restUrl, "GET", {}, broadcast);
        },
        post: function (data) {
            var restUrl = "authors/";
            restService.restCall(restUrl, "POST", data, "reloadList");
        },
        put: function (Id, data) {
            var restUrl = "authors/" + Id;
            restService.restCall(restUrl, "PUT", data, "reloadList");
        },
        delete: function (Id) {
            var restUrl = "authors/" + Id;
            restService.restCall(restUrl, "DELETE", {}, "reloadList");
        }
    };

    return authorServant;
}]);

// creating Ratings service
app.service("Ratings", ["restService", function (restService) {
    var ratingServant = {
        get: function (Id) {
            var broadcast = Id ? "gotRating" : "gotRatings";
            var restUrl = Id ? "ratings/" + Id : "ratings/";
            restService.restCall(restUrl, "GET", {}, broadcast);
        },
        put: function (Id, data) {
            var restUrl = "ratings/" + Id;
            restService.restCall(restUrl, "PUT", data);
        }
    };

    return ratingServant;
}]);


app.service("Login", ["$rootScope", function ($rootScope) {
    $rootScope.DDtext = "Logga in";
    $rootScope.loggedin = "0";
    this.loginStatus = function (id) {
        if (id == 1) {

            $rootScope.loggedin = [id];
            $rootScope.DDtext = "Admin";
            console.log("Admin: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
        else if (id == 2) {

            $rootScope.loggedin = [id];
            $rootScope.DDtext = "Lager"
            console.log("Lager: " + $rootScope.loggedin);
            return $rootScope.loggedin;
        }
        else if (id == 0) {
            $rootScope.DDtext = "Logga in";
            $rootScope.loggedin = [id];
            console.log("Logged out!");
            return $rootScope.loggedin;
        }
    };
}]);