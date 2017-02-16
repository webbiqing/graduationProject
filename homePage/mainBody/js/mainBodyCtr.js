/**
 * 主体部分控制器
 */
App.controller('mainBodyCtr', function($rootScope, $scope) {
    //启动首页主轮播
    (function () {
        var scrollDuration = 2000;
        var easeInCubic = 'quadratic';
        //	small images carousel
        $('#carousel-small').carouFredSel({
            direction: 'up',
            width: 550,
            height: 220,
            items: {
                visible: 1,
                width: 550,
                height: 220
            },
            align: false,
            pagination: '#navi',
            scroll: {
                fx: 'directscroll',
                duration: scrollDuration,
                timeoutDuration: 4000,
                easing: easeInCubic,
                onBefore: function (data) {
                    data.items.old.animate({
                        'margin-right': -100
                    }, scrollDuration, easeInCubic);
                    data.items.visible.css({
                        'margin-right': 120
                    }).animate({
                        'margin-right': 10
                    }, scrollDuration, easeInCubic);
                    var index = $(this).triggerHandler('currentPosition');
                    if (index == 0) {
                        index = $(this).children().length;
                    }
                    //	trigger the titles carousel
                    $('#carousel-title').trigger('slideTo', [index, 'next']);
                    //	trigger the large images carousel
                    $('#carousel-large').trigger('slideTo', [index, 'prev']);
                }
            }
        });
        //	large images carousel, controlled by thxe small images carousel
        $('#carousel-large').carouFredSel({
            direction: 'down',
            width: 860,
            height: 300,
            items: {
                visible: 1,
                width: 860,
                height: 300
            },
            align: false,
            auto: false,
            scroll: {
                fx: 'directscroll',
                duration: scrollDuration,
                easing: easeInCubic,
                onBefore: function (data) {
                    data.items.old.animate({
                        'margin-left': -140
                    }, scrollDuration, easeInCubic);
                    data.items.visible.css({
                        'margin-left': 160
                    }).animate({
                        'margin-left': 10
                    }, scrollDuration, easeInCubic);
                }
            }
        });

        //	titles carousel, controlled by the small images carousel
        $('#carousel-title').carouFredSel({
            width: 460,
            height: 100,
            items: {
                visible: 1,
                width: 350,
                height: 100
            },
            align: false,
            auto: false,
            scroll: {
                fx: 'directscroll',
                duration: scrollDuration,
                easing: easeInCubic
            }
        });
        //	tweek the pagination to always scroll forward
        $('#navi a')
            .unbind('click')
            .bind('click', function (event) {
                    event.preventDefault();
                    $('#carousel-small').trigger('slideTo', [$(this).index(), true, 'next']);
                }
            );

    })();
    //配置第二层轮播
    $scope.swiper = {};
    $scope.next = function() {
        $scope.swiper.slideNext();
    };
    $scope.onReadySwiper = function(swiper) {
        swiper.on('slideChangeStart', function() {

        });
    };
});