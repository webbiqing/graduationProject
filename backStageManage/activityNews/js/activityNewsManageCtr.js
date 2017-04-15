/**
 * Created by hand on 2017/2/16.
 */
App.controller('activityNewsManageCtr', function($rootScope, $scope, $stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload,NgTableParams){
    var tableData = [];
    //运河城市园区宣传列表分页查询
    $scope.tableParams = new NgTableParams({page:1,count:6},{counts: [],total: tableData.length,getData: function($defer, params) {
        var param = {
            'pavilionNum':'6256826112253366272'
        };
        cmsImageUpload.Query('exhibition/articles',param).then(function (data) {
            if(angular.isUndefined(data.error)){
                tableData = data.result.data;
                params.total(data.result.page.total_elements);
                params.totalPages = Math.ceil(tableData.length/params.count());
                $defer.resolve(tableData);	//更新数据 就是页面上的$data
            }else{

            }
        });
    }});



    $scope.deletePublicity = function (id) {
        var param = {
            'id':id
        };
        cmsImageUpload.Delete('exhibition/articles/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.tableParams.reload();
                alert('删除成功！');
            } else {
                alert('删除失败！');
            }
        });
    };
});
