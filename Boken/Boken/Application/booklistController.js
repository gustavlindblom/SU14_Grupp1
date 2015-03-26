app.controller("booklistController", ["$scope", "Books", "Authors", "Genres", "$modal", "$log", "$route", function ($scope, Books, Authors, Genres, $modal, $log, $route) {
    // Filter property
    var allBooks;

    // Pagination properties
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;
    $scope.pagArr = [];
    $scope.bigCurrentPage = 1;
    $scope.itemsPP = 5;
    $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
    $scope.endshow = ($scope.startshow + $scope.itemsPP);

    // Fetch books data from the database
    $scope.$on("gotBooks", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        allBooks = $scope.books = data;
        $scope.totalItems = $scope.books.length;
        $scope.pagArr = $scope.books.slice($scope.startshow, $scope.endshow);
    });
    Books.get();

    // Fetch authors and genres data from the database for filtering purposes
    $scope.$on("gotAuthors", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.authors = data;
    });
    Authors.get();

    $scope.$on("gotGenres", function (event, data) {
        $scope.output = JSON.stringify(data, null, '\t');
        $scope.genres = data;
    });
    Genres.get();

    // Reload the list when changes occur
    $scope.$on("reloadList", function (event, data) {
        $route.reload();
    });
    
    // Slice the complete array and display only the ones
    // in the current page
    $scope.pageChanged = function (currScope) {
        $scope.bigCurrentPage = currScope.bigCurrentPage;
        $scope.startshow = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        $scope.endshow = ($scope.startshow + $scope.itemsPP);
        $scope.pagArr = $scope.books.slice($scope.startshow, $scope.endshow);
    };

    // A custom search method, filters the whole list by genre and/or author
    $scope.filterBooks = function (author, genre) {
        if (!author && !genre) {
            $scope.books = allBooks;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.books.length;
            $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
            return;
        }
        $scope.books = allBooks;
        newBooksArr = [];
        var dataArr = $scope.books;

        for (var i = 0; i < dataArr.length; i++) {
            filter(dataArr[i], author, genre);
        }

        $scope.books = newBooksArr;

        $scope.currentPage = 1;
        $scope.totalItems = $scope.books.length;
        $scope.pagArr = $scope.books.slice(($scope.currentPage - 1) * $scope.numPerPage, $scope.currentPage * $scope.numPerPage);
    }

    var filter = function (objekt, authorName, genreName) {
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
    };

    // Open a modal of a book if the user clicks it, or wants to delete/edit/create
    $scope.open = function (view, book, action, size) {
        if (book) { // The book exists, either to be viewed, edited or deleted
            var modalInstance = $modal.open({
                templateUrl: 'partials/bookDetail.html',
                controller: 'bookDetailController',
                size: size,
                resolve: {
                    param: function () {
                        params = {
                            id: book.Id,
                            view: view,
                            action: action
                        }
                        return params;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $route.reload();
                $scope.selected = selectedItem;
            }, function () {
            });
        }
        if (!book) { // The book doesn't exist, we're creating a new one
            var modalInstance = $modal.open({
                templateUrl: 'partials/bookDetail.html',
                controller: 'bookDetailController',
                resolve: {
                    param: function () {
                        params = {
                            view: view,
                            action: action
                        }
                        return params;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $route.reload();
                $scope.selected = selectedItem;
            }, function () {

            });
        }
    };
}]);