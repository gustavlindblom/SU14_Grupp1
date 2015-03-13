app.controller("booklistController", ["$scope", "Books", "$modal", "$log", function ($scope, Books, $modal, $log) {
    console.log("books loaded");

    $scope.sort = "Title";

    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
        console.log("function returns: ", $scope.filterBooksByAuthor(data, 4));
    });

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

    // authorId hämtas från fritextfältet, genreId hämtas ifrån DD, data är inlästa listan av böcker
    $scope.filterBooksByAuthor = function (data, authorId, genreId) {
        var booksByAuthor = [];

        console.log(data)

        for (var i = 0; i < data.length; i++) {
            var book = data[i];
            for (var j = 0; j < book.Authors.length; j++) {
                var author = book.Authors[j];
                if (author.Id == authorId) {
                    if (genreId) {
                        for (var h = 0; h < book.Genres.length; h++) {
                            var genre = book.Genres[h];
                            if (genre.Id == genreId)
                                booksByAuthor.push(book);
                        }
                    } else {
                        booksByAuthor.push(book);
                    }
                }
            }
        }

        //for (var book in data) {
        //    console.log(book);
        //    for (var author in book.Authors)
        //    {
        //        console.log(author);
        //        if (author.Id == authorId) {
        //            if (genreId) {
        //                for (var genre in book.Genres)
        //                {
        //                    if (genre.Id == genreId) {
        //                        booksByAuthor.push(book);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //};
        return booksByAuthor;
    };

    // ----- Modal ----- //


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
    //----------------------------//

    Books.get();
    
}]);




