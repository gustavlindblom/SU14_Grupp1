app.controller('headerController', ['$scope', '$location', 'Login', '$modal', "Genres", "Authors", "Books", function ($scope, $location, Login, $modal, Genres, Authors, Books) {
    $scope.isCollapsed = true;
    $scope.loginStatus = function (status) {
        Login.loginStatus(status);
        $scope.navCollapse();
    };

    $scope.navCollapse = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.GoTo = function (url) {
        $location.url(url);
        $scope.navCollapse();
    }
   
    // ----- öppna vy för att skapa ny genre--- //

    $scope.createNewGenre = function ( view, action) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/genreDetail.html',
            controller: 'genreDetailController',
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
            $scope.selected = selectedItem;
            Genres.get();
        }, function () {
        });
        $scope.navCollapse();
    };

    // ---------- skapa ny författare ---------//
    $scope.createNewAuthor = function (view, action) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/authorDetail.html',
            controller: 'authorDetailController',
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
            $scope.selected = selectedItem;
            Authors.get();
        }, function () {
        });
        $scope.navCollapse();
    };

    // ---------- skapa ny författare ---------//
    $scope.createNewBook = function (view, action) {
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
            $scope.selected = selectedItem;
            Authors.get();
        }, function () {

        });
        $scope.navCollapse();
    };
}]);

