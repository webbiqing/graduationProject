/**
 * Created by hand on 2017/2/8.
 */
var serviceApp = angular.module('serviceModule',['ngResource']);

serviceApp.service('cmsImageUpload', function ($q, $http,$resource) {

    var base_url = 'http://localhost:9091/';

    //上传图片
    this.image_upload = function (image) {
        var paramData = new FormData();
        paramData.append('cmsFile', image);
        return $http({
            method:'POST',
            url:"http://localhost:9092/exhibition/file/imgfile",
            data: paramData,
            headers: {'Content-Type':undefined},
            transformRequest: angular.identity
        }).then(function (d) {
            return $q.when(d);
        },function (d) {
            return $q.reject(d);
        });
    };

    this.Query = function(url,queryPara){
        var resource_query = $resource(base_url + url,{},{get:{method:'get'}});
        var defer = $q.defer();
        resource_query.get(queryPara,function(data,header){
            defer.resolve(data);
        },function(response){
            defer.reject(response);
        });
        return defer.promise;
    };

    this.Add = function(url,queryPara,formData){
        var resource_add = $resource(base_url + url,{},{save:{method:'post'}});
        var defer = $q.defer();
        resource_add.save(queryPara,formData,function(data,header){
            defer.resolve(data);
        },function(response){
            defer.reject(response);
        });
        return defer.promise;
    };

    this.Update = function(url,queryPara,formData){
        var resource_update = $resource(base_url + url,{},{update:{'method':'put'}});
        var defer = $q.defer();
        resource_update.update(queryPara,formData,function(data,header){
            defer.resolve(data);
        },function(response){
            defer.reject(response);
        });
        return defer.promise;
    };

    this.Delete = function(url,queryPara){
        var resource_delete= $resource(base_url + url,{},{delete:{'method':'delete'}});
        var defer = $q.defer();
        resource_delete.delete(queryPara,function(data,header){
            defer.resolve(data);
        },function(response){
            defer.reject(response);
        });
        return defer.promise;
    };
});