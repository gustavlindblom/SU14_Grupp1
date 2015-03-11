app.controller("modalController", ["$scope", "$modalInstance", function ($scope, $modalInstance) {
    console.log("modalControsadfsadller is alive!");

    //$scope.ok = function () {
    //    $modalInstance.close("meh");
    //};

    //$scope.cancel = function () {
    //    $modalInstance.dismiss('cancel');
    //};
    


}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
    console.log("modal modalController is alive!");


});