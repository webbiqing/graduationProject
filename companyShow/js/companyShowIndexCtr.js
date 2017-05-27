/**
 * Created by hand on 2017/2/16.
 */
App.controller('companyShowIndexCtr', function($rootScope, $scope, $state,$resource, $filter,ngDialog,cmsImageUpload) {
    var querryAll = function () {
        var param = {
            'id':'6256826112253366272'
        };
        cmsImageUpload.Query('exhibition/pavilion/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.companyData = data.result.data;
            } else {

            }
        });
    };
    querryAll();
    var querryPro = function () {
        var param = {
            'pavilionNum':'6256826112253366272'
        };
        cmsImageUpload.Query('exhibition/products',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.carouselData = data.result.data;
            } else {

            }
        });
    };
    querryPro();
});