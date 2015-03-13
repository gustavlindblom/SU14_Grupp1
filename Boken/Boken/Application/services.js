
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
                data = checkData(data);             // kommenterade in detta (ns)
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
                //using $rootscope to distribute a model (data) to all
                //$scopes in the app
                // $rootScope.output = JSON.stringify(data, null, '\t');
                // (all scopes now have the propery "output")

                //om broadcastName har ett namn, använd det, annars "restSuccess"
                broadcastName = broadcastName ? broadcastName : "restSuccess";
                console.log("restCall success: ", data, " now broadcasting on: ", broadcastName);
                $rootScope.$broadcast(broadcastName, data);
                // (all "listeners" have now recieved our stringified data)
            }).error(function (data, thrownError) {
                console.log("Errormessage: ", data, thrownError);
                $rootScope.thrownError = thrownError;
                $location.path('/error');
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
            restService.restCall(restUrl, "POST", data);
        },
        put: function (Id, data) {
            var restUrl = "books/" + Id;
            restService.restCall(restUrl, "PUT", data);
        },
        delete: function (Id) {
            var restUrl = "books/" + Id;
            restService.restCall(restUrl, "DELETE", {});
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
            restService.restCall(restUrl, "POST", data);
        },
        put: function (Id, data) {
            var restUrl = "genres/" + Id;
            restService.restCall(restUrl, "PUT", data);
        },
        delete: function (Id) {
            var restUrl = "genres/" + Id;
            restService.restCall(restUrl, "DELETE", {});
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
            restService.restCall(restUrl, "POST", data);
        },
        put: function (Id, data) {
            var restUrl = "authors/" + Id;
            restService.restCall(restUrl, "PUT", data);
        },
        delete: function (Id) {
            var restUrl = "authors/" + Id;
            restService.restCall(restUrl, "DELETE", {});
        }
    };

    return authorServant;
}]);