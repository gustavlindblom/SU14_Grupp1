// controller for home.html
app.controller("homeController", ["$scope", "Books", "Ratings", "$modal", function ($scope, Books, Ratings, $modal) {

    // lyssna på gotBooks
    $scope.$on("gotBooks", function (event, data) {
        $scope.books = data;
        Ratings.get();
    });

    // lyssna på gotRatings
    $scope.$on("gotRatings", function (event, data) {
        $scope.ratings = data;
        $scope.topThreeBooks = [];
        var topThreeRatings = data.sort(function (a, b) { return b.AverageRating - a.AverageRating; }).slice(0, 3);
        // bygger arrayen 3 topratade books
        topThreeRatings.forEach(function (rating) {
            $scope.books.forEach(function (book) {
                if (book.Rating.Id == rating.Id) {
                    $scope.topThreeBooks.push(book);
                }
            });
        });
    });

    $scope.open = function (view, book, action, size) {
        if (book) {
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
                $scope.selected = selectedItem;
            }, function () {

            });
        }
        if (!book) {
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
    Books.get();
}]);
