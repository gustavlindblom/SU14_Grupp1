app.controller("booklistController", ["$scope", "Books", "Authors", "Genres", "$modal", "$log", function ($scope, Books, Authors, Genres, $modal, $log) {
    var allBooks;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;
    $scope.sort = "Title";

    $scope.$on("gotBooks", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        allBooks = $scope.books = data;
        $scope.totalItems = data.length;
        $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
    });
    Books.get();

    $scope.numberOfPages = function () {
        return Math.ceil($scope.totalItems / $scope.numPerPage);
    };

    $scope.previousPage = function () {
        if ($scope.currentPage != 1) {
            $scope.currentPage--;
        };

        $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
    };

    $scope.nextPage = function () {
        if ($scope.currentPage != Math.ceil(($scope.books.length / $scope.numPerPage))) {
            $scope.currentPage++;
        }

        $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
    };

    $scope.sortByTitle = function () {
        if ($scope.sort == "Title") $scope.sort = "-Title";
        else $scope.sort = "Title";
    };

    $scope.sortByAuthor = function () {
        if ($scope.sort == "Author") $scope.sort = "-Author";
        else $scope.sort = "Author";
    };

    $scope.sortByGenre = function () {
        if ($scope.sort == "Genre") $scope.sort = "-Genre";
        else $scope.sort = "Genre";
    };

    $scope.sortByPrice = function () {
        if ($scope.sort == "Price") $scope.sort = "-Price";
        else $scope.sort = "Price";
    }

    $scope.customSort = function (book) {
        if ($scope.sort == "Title" || $scope.sort == "-Title")
            return book.Title;
        else if ($scope.sort == "Author" || $scope.sort == "-Author")
            return book.Authors[0].Name;
        else if ($scope.sort == "Genre" || $scope.sort == "-Genre")
            return book.Genres[0].Name;
        else
            return book.Price;
    }

    $scope.$on("gotAuthors", function (event, data) {
        console.log("gotAuthors triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    Authors.get();

    $scope.authorslist = function () {
        var authorlist = [];
        for (var a in authors) {
            authorlist.push(a.Name)
        }
    };

    $scope.$on("gotGenres", function (event, data) {
        console.log("gotGenres triggered: ", data);
        $scope.output = JSON.stringify(data, null, '\t'); 
        $scope.genres = data;
    });
    Genres.get();

    $scope.genreslist = function() {
        var genrelist = [];
        for(var g in genres){
            genrelist.push(g.Name);
        }
    }

    // --- filtrering ---   //
    $scope.filterBooks = function (author, genre) {
        console.log("kommer in");
        $scope.books = allBooks;
        newBooksArr = [];
        var dataArr = $scope.books;

         
        for (var i = 0; i < dataArr.length; i++) 
        {
            //console.log(dataArr[i]);
            filter(dataArr[i], author, genre);
    
        }
        console.log("den nya arr ", newBooksArr)

        $scope.books = newBooksArr;
                // -- spara --- //
                $scope.currentPage = 1;
                $scope.totalItems = $scope.books.length;
                $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
                // --- ---- --- //
    }

    var filter = function (objekt, authorName, genreName) 
    {
        if (authorName && genreName) {
            objekt.Authors.forEach(function (author) {
                objekt.Genres.forEach(function (genre) {
                    if (genre.Name.toLowerCase().indexOf(genreName.toLowerCase()) >= 0 && author.Name.toLowerCase().indexOf(authorName.toLowerCase()) >= 0)
                        if (newBooksArr.indexOf(objekt) == -1) newBooksArr.push(objekt);
                })
            });
        } else if (authorName) {
            objekt.Authors.forEach(function (author) {
                if (author.Name.toLowerCase().indexOf(authorName.toLowerCase()) >= 0)
                    if (newBooksArr.indexOf(objekt) == -1) newBooksArr.push(objekt);
            });
        } else if (genreName) {
            objekt.Genres.forEach(function (genre) {
                if (genre.Name.toLowerCase().indexOf(genreName.toLowerCase()) >= 0)
                    if (newBooksArr.indexOf(objekt) == -1) newBooksArr.push(objekt);
            });
        }
    }

    // ---------------------------------//

$scope.open = function (book) {

    var modalInstance = $modal.open({
        templateUrl: 'partials/bookModal.html',
        controller: 'bookModalController',

        resolve: {
            id: function () {
                return book.Id;
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    }, function () {

    });
};

}]);




