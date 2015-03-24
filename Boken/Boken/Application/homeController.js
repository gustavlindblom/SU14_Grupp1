// controller for home.html
app.controller("homeController", ["$scope", "Books", "Ratings", function ($scope, Books, Ratings) {
    // lyssna på gotBooks
    $scope.$on("gotBooks", function (event, data) {
        $scope.books = data;
        Ratings.get();
    });

    // lyssna på gotRatings
    $scope.$on("gotRatings", function (event, data) {
        $scope.ratings = data;
        var topThreeRatings = data.sort(function (a, b) { return b.AverageRating - a.AverageRating; }).slice(0, 3);
        var topThreeBooks = []
        topThreeRatings.forEach(function (rating) {
            console.log(rating);
            $scope.books.forEach(function (book) {
                if (book.RatingId == rating.Id) {
                    topThreeBooks.push(book);
                }
            });
        });
        console.log(topThreeBooks);
    });


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
