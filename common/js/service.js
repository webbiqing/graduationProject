/**
 * Created by hand on 2017/2/8.
 */
var serviceApp = angular.module('serviceModule',['ngResource']);

serviceApp.service('cmsImageUpload', function ($q, $http) {
    //上传图片
    this.image_upload = function (image) {
        var paramData = new FormData();
        paramData.append('cmsFile', image);
        return $http({
            method:'POST',
            url:"http://10.211.54.221:9092/exhibition/file/imgfile",
            data: paramData,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        }).then(function (d) {
            return $q.when(d);
        },function (d) {
            return $q.reject(d);
        });
    };
    
});