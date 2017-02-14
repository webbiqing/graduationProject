/**
 * 主体部分控制器
 */
App.controller('mainBodyCtr', function($rootScope, $scope) {
    $scope.swiper = {};
    $scope.next = function() {
        $scope.swiper.slideNext();
    };
    $scope.onReadySwiper = function(swiper) {
        console.log('onReadySwiper');
        swiper.on('slideChangeStart', function() {
            console.log('slideChangeStart');
        });
    };
});