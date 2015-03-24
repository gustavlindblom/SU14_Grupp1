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
        console.log(data);
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
        console.log($scope.topThreeBooks);

    });

    $scope.open = function (view, book, action, size) {
        console.log("book", book, "view", view);

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
                        console.log("param:", params)
                        return params;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                //$route.reload();
                $scope.selected = selectedItem;
            }, function () {

            });
        }
        if (!book) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/bookDetail.html',
                controller: 'bookDetailController',
                //size: size,
                resolve: {
                    param: function () {
                        params = {
                            view: view,
                            action: action
                        }
                        console.log("param:", params)
                        return params;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                console.log("Kommer vi hit någon  gång gång?");
                $route.reload();
                $scope.selected = selectedItem;
            }, function () {

            });
        }


    };
    //var imagePath = '/Content/Image/';

    //var images = [imagePath + 'saganomringen.jpg', imagePath + 'anglarodemoner.jpg', imagePath + 'davinci.jpg', imagePath + 'Det.jpg'];


    //$scope.myInterval = 5000;
    //var slides = $scope.slides = [];

    //$scope.addSlide = function () {
    //    var newWidth = slides.length + 1;
    //    slides.push({
    //        image: images[i],

    //    });
    //};
    //for (var i = 0; i < 4; i++) {
    //    $scope.addSlide();
    //}

    Books.get();
}]);
