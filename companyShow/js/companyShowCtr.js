/**
 * Created by hand on 2017/2/16.
 */
App.controller('companyShowCtr', function($rootScope, $scope, $state,$resource, $filter,ngDialog,cmsImageUpload) {
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
});

