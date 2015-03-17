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

    // authorId hämtas från fritextfältet, genreId hämtas ifrån DD, data är inlästa listan av böcker
    $scope.filterBooksByAuthor = function (selected, selectedgenre) {
        
        $scope.books = allBooks;

        console.log("författare: ", selected, selectedgenre)
        var booksByAuthor = [];
        var data = $scope.books;
        var genreId = selectedgenre;
        var authorId = selected;

        if((authorId === undefined && genreId === undefined) || (authorId === "" && genreId === "") || (authorId === undefined && genreId === "") || (authorId === "" && genreId === undefined))
        {
           console.log("båda fel");
            return;
        }
        else
            {
      

        if (authorId !== undefined || authorId !== "")
            {
            console.log("authorId ej und");
                for (var book of data) 
                {
                    for (var a of book.Authors) 
                    {
                        if (a.Name.toLowerCase().indexOf(authorId.toLowerCase()) >= 0) 
                        {
                            console.log("Inne i författare", a.Name, authorId);
                            if(genreId !== undefined) 
                            {
                                console.log("hej hej", authorId, genreId);
                                for (var g of book.Genres)
                                {
                                    if (g.Name.toLowerCase().indexOf(genreId.toLowerCase()) >= 0) 
                                    {

                                        booksByAuthor.push(book);
                                        console.log("push genre");
                                    }
                                }   
                            }
                            else 
                            {
                                if(booksByAuthor.indexOf(book) >= 0)
                                {
                                    console.log("nope");
                                    continue
                                }
                                else 
                                console.log("pushar");
                                booksByAuthor.push(book);
                        }
                        }
                    }
                }
            }
        else 
        {
            for (var book of data) 
                {
                    for (var g of book.Genres) 
                    {
                        if (g.Name.toLowerCase().indexOf(genreId.toLowerCase()) >= 0) 
                        {
                            console.log("Inne i else");
                             if(booksByAuthor.indexOf(book) >= 0)
                        {
                                    console.log("nope");
                                    continue
                                }
                                else 
                                console.log("pushar");
                        booksByAuthor.push(book);
                    
                    }
                }
            }
        }

                $scope.books = booksByAuthor;
                console.log("ewqewq ", booksByAuthor);
}

    
};

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




