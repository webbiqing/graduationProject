/**
 * Created by hand on 2017/2/8.
 */

App.filter('stringFilter', function() {
    return function (input) {
        var inputs = input.slice(21);
        return inputs;
    };
});