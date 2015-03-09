//nothing to see here (yet), move along citizen...
app.service("restService", ["$http", "$rootScope", function($http, $rootScope) {
  //we don't have to return all code in a service,
  //we can also have functions/variables that are only accessible
  //inside the service itself but still affect output/results
  //in the controller
  function checkData (data) {
    console.log("typeof", typeof data);
    if (typeof data == "String") {
      try {
        //try to convert string to JSON (JS object)
        eval("data="+data);
        return data;
      } catch(ee) {
        //and if we fail, notify user
        return false;
      }
    }
  }

  var restServant = {
    helloWorld : function() {
      console.log("Hello World!");
      //sharing the rootScope property hello to all child $scopes
      $rootScope.hello = "Hello";
    },
    restCall : function(url, method, data) {
      if (method != "GET" && method != "DELETE") {
        //using a function only accessible INSIDE out service
        //to check if data is valid
        //data = checkData(data);
      }
      if (data === false) {
        //if data is not valid (FALSE), return false
        return false;
      }

       //if data passed inspection, send our AJAX REST request
      $http({
        url : "/api/" + url,
        method: method,
        // DO NOT STRINGIFY DATA WHEN SENDING IT WITH $http
        data : data,
        responseType: "json"
      }).success(function(data) {
        console.log("restCall success: ", data);
        //using $rootscope to distribute a model (data) to all
        //$scopes in the app
        // $rootScope.output = JSON.stringify(data, null, '\t');
        // (all scopes now have the propery "output")

        //using $rootScope to broadcast data to any "listeners" in the app
        $rootScope.$broadcast("restSuccess", data);
        // (all "listeners" have now recieved our stringified data)
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
        get : function (bookId) {
            var restUrl = bookId ? "books/" + bookId : "books/";
            restService.restCall(restUrl, "GET", {});
        },
        post : function (data) {
            var restUrl = "books/";
            restService.restCall(restUrl, "POST", data);
        },
        put : function (bookId, data) {
            var restUrl = "books/" + bookId;
            restService.restCall(restUrl, "PUT", data);
        },
        delete : function (bookId) {
            var restUrl = "books/" + bookId;
            restService.restCall(restUrl, "DELETE", {});
        }
    };

    return bookServant;
}]);

// creating Genres service (ns)
app.service("Genres", ["restService", function (restService) {
    var genreServant = {
        get: function (Id) {
            var restUrl = Id ? "genres/" + Id : "genres/";
            restService.restCall(restUrl, "GET", {});
        }
        // plats för post, put och delete
    };
    return genreServant;
}]);


//creating Authors service
app.service("Authors", ["restService", function (restService) {
    var authorServant = {
        get: function (authorId) {
            var restUrl = authorId ? "authors/" + authorId : "authors/";
            restService.restCall(restUrl, "GET", {});
        },
        post: function (data) {
            var restUrl = "authors/";
            restService.restCall(restUrl, "POST", data);
        },
        put: function (authorId, data) {
            var restUrl = "authors/" + authorId;
            restService.restCall(restUrl, "PUT", data);
        },
        delete: function (authorId) {
            var restUrl = "authors/" + authorId;
            restService.restCall(restUrl, "DELETE", {});
        }
    };

    return authorServant;
}]);