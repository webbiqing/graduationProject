/**
 * 头部控制器
 */

App.controller('topBarCtrl', function($rootScope, $scope) {
    $scope.show = false;
    $scope.choose = function () {
        $scope.show = true;
    };
    $scope.change =function () {
        $scope.show = false;
    }
});
