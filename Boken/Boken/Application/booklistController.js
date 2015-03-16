app.controller("booklistController", ["$scope", "Books", "Authors", "$modal", "$log", function ($scope, Books, Authors, $modal, $log) {
    console.log("books loaded");

    //$scope.bigTotalItems = Books.length();          // nytt!
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 10;

    $scope.$watch("bigCurrentPage", function (newValue, oldValue) {
        console.log("bigCurrentPage: ", newValue);
        var showIndex = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        console.log("showIndex: " + showIndex + " - " + (showIndex + $scope.itemsPP - 1));
    });


    $scope.sort = "Title";

    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.books = data;
        //console.log("function returns: ", $scope.filterBooksByAuthor(data, 4));
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



    //------Hämtar lista av författare -------------//
    
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
    //-----------------------------//


    // authorId hämtas från fritextfältet, genreId hämtas ifrån DD, data är inlästa listan av böcker
    $scope.filterBooksByAuthor = function (selected, selectedgenre) {
        
        console.log("författare: ", selected, selectedgenre)
        var booksByAuthor = [];
        var data = $scope.books;
        var genreId = selectedgenre;
        var authorId = selected;
        
        if (authorId !== undefined )
            {
                for (var book of data) 
                {
                    for (var a of book.Authors) 
                    {
                        if (a.Name.includes(authorId) ) 
                        {
                            console.log("Inne i författare");
                            if(genreId !== undefined) 
                            {
                                console.log("hej hej", authorId, genreId);
                                for (var g of book.Genres)
                                {
                                    if (g.Name.includes(genreId)) 
                                    {
                                        booksByAuthor.push(book);
                                    }
                                }   
                            }
                            else 
                            {
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
                        if (g.Name.includes(genreId)) 
                        {
                            console.log("Inne i författare");
                            booksByAuthor.push(book);
                        }
                    }
                }
        }

                $scope.books = booksByAuthor;
    
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




