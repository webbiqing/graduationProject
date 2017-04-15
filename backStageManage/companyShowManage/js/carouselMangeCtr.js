/**
 * Created by hand on 2017/2/16.
 */
App.controller('carouselMangeCtr', function($rootScope, $scope,$stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {


    var querryAll = function (id) {
        var param = {
            'pavilionNum':'6256826112253366272',
            'type':1
        };
        cmsImageUpload.Query('exhibition/pavilion/imgs',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.carouselData = data.result.data;
            } else {

            }
        });
    };
    querryAll();

    $scope.delCarousel = function (id) {
        var param = {
            'id':id
        };
        cmsImageUpload.Delete('exhibition/pavilion/img/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                querryAll();
                alert('删除成功！');
            } else {
                alert('删除异常！');
            }
        });
    };
});
