/**
 * Created by hand on 2017/2/15.
 */
App.controller('homePageCtr', function($rootScope, $scope) {
    $scope.show = false;
    $scope.choose = function () {
        $scope.show = true;
    };
    $scope.change =function () {
        $scope.show = false;
    }
});

