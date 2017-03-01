/**
 * Created by hand on 2017/2/28.
 */
App.controller('registerCtr', function( $scope,$state) {
    $scope.register_type = undefined;

    $(".input1").focus(function() {
        var c = $(this).prev(".reg-msg"),
            d = c.outerWidth(true);
        c.animate({
            left: -d - 12
        }, 160)
    });

});