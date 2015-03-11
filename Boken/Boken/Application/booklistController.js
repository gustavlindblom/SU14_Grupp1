app.controller("booklistController", ["$scope", "Books", function ($scope, Books) {
    console.log("books loaded");

    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
    });

    $scope.showBook = function (book) {

        $scope.textModal = book;

    };

    // authorId hämtas från fritextfältet, genreId hämtas ifrån DD, data är inlästa listan av böcker
    $scope.filterBooksByAuthor = function (authorId, genreId, data) {
        var booksByAuthor = [];

        for (var book in data) {
            for (var author in book.Authors) {
                if (author.Id === authorId) {
                    if (genreId) {
                        for (var genre in book.Genres)
                        {
                            if (genre.Id === $scope.selectedGenre) {
                                booksByAuthor.push(book);
                            }
                        }
                    }
                }
            }
        };
        return booksByAuthor;
    };


    Books.get();


}]);




