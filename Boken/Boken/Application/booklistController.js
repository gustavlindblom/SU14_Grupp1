app.controller("booklistController", ["$scope", "Books", "Authors", "Genres", "$modal", "$log", function ($scope, Books, Authors, Genres, $modal, $log) {
    console.log("books loaded");

    var allBooks;

    $scope.sort = "Title";

    $scope.$on("gotBooks", function (event, data) {
        console.log("gotBooks triggered : ", data);
        $scope.output = JSON.stringify(data, null, '\t');
        allBooks = $scope.books = data;
        $scope.totalItems = $scope.books.length;
        $scope.pagArr = $scope.books.slice($scope.startshow, $scope.endshow);
    });

    // Början på paginering
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.books.slice($scope.startshow, $scope.endshow);
    }
    // slut på paginering

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


    //------Hämtar lista av genre -------------//

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
      

            if (authorId !== undefined )
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

// ------ Niklas & Gustavs loop ---- //
//for (var i = 0; i < data.length; i++) {
//    var book = $scope.books[i];
//    for (var j = 0; j < book.Authors.length; j++) {
//        var author = book.Authors[j];
//        if (author.Id == authorId) {
//            if (genreId) {
//                for (var h = 0; h < book.Genres.length; h++) {
//                    var genre = book.Genres[h];
//                    if (genre.Id == genreId)
//                        booksByAuthor.push(book);
//                }
//            } else {
//                booksByAuthor.push(book);
//            }
//        }
//    }
//}
// ---- slut ------ //

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




