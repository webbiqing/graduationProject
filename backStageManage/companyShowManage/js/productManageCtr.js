/**
 * Created by hand on 2017/2/16.
 */
App.controller('productManageCtr', function($rootScope, $scope, $stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {

    var querryAll = function (title,type) {
        var param = {
            'pavilionNum':'6256826112253366272',
            'productName':title,
            'productType':type
        };
        cmsImageUpload.Query('exhibition/products',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.carouselData = data.result.data;
            } else {

            }
        });
    };
    querryAll();

    $scope.searchData =function (title,type) {
        querryAll(title,type);
    };
    
    $scope.delProduct = function (id) {
        var param = {
            'id':id
        };
        cmsImageUpload.Delete('exhibition/product/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                querryAll();
                alert('删除成功！');
            } else {
                alert('删除异常！');
            }
        });
    };

});
