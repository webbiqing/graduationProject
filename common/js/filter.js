/**
 * Created by hand on 2017/2/8.
 */

App.filter('stringFilter', function() {
    return function (input) {
        var inputs = input.slice(21);
        return inputs;
    };
});

App.filter('textLengthSet', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');//'...'可以换成其它文字
    };
});

//这是文件上传的指令
App.directive('fileModel', function($parse, fileReader) {
    return {
        restrict: 'A',
        scope:{
            imgUrl:'=imgUrl'
        },
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event) {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                //scope.getFile();
                fileReader.readAsDataUrl(scope.file, scope)
                    .then(function(result) {
                        //console.log(scope.imgUrl);
                        //var temp = attrs.imgUrl;
                        //console.log(result);
                        scope.imgUrl = result;
                        //scope.$eval(attrs.imgUrl + "='" + result.replace(/'/g, "\\'") + "'" );
                    });
            });
        }
    };
});