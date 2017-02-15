/**
 * 企业展示路由
 */
/*企业展示:标准展1*/
App.controller('companyShowInfoCtr', function($rootScope, $scope, $state,$resource, $filter,ngDialog,$timeout) {
    /*//企业id
    $scope.companyId = window.localStorage.user_id;*/
    //企业基本信息
    $scope.cardInfo= {
        'name':'',
        'address':'',
        'mode':'',
        'range':'',
        'contact':'',
        'phone':'',
        'web':'',
        'logoSrc':'',
        'introduce':'',
        'achievement':''
    };
    //临时保存企业编辑的内容
    $scope.temp = null;
    //暂存产品信息
    $scope.productTemp = null;
    $scope.isDirty = false;
    $scope.isDirty_service = false;
    //添加产品
    $scope.addProduct = {
        url:'',
        name:'',
        desc:''
    }
    //暂存服务信息
    $scope.serviceTemp = null;
    //企业名片编辑 状态控制
    $scope.card_edit = false;
    //设置各部分上传的上限数
    $scope.oUpper = {
        product:8,
        isProduct:false,
        service:8,
        isService:false,
        banner:6,
        isBanner:false,
        honor:8,
        isHonor:false
    }
    /*产品模块--start*/
    //点击编辑产品
    $scope.productEdit = function (product) {
        for(var i = 0; i < $scope.products.length; i++){
            if( $scope.products[i].isAdd == true){
                break;
            }
        }
        if(i==$scope.products.length){
            product.isAdd = true;
            $scope.productTemp = angular.copy(product);
        }
    }
    //点击保存产品按钮
    $scope.saveProductEdit = function (product,index) {
        if(angular.equals($scope.productTemp,product)){
            product.isAdd = false;
        }else if(angular.equals($scope.productTemp.service_img_url,product.service_img_url)){
            //调用接口修改
            var temp = $resource(base_url+'cm/services/:serviceId',{},{update:{method:'put'}});
            var para1 = {serviceId:product.service_id};
            var para2 = {
                service_name:product.service_name,
                service_desc:product.service_desc
            };
            temp.update(para1,para2,
                function(data,headers){
                    //console.info("调用修改接口",data);
                    if(angular.isUndefined(data.error)){
                        //获取产品
                        $scope.getCompanyService(1);

                    }
                },function(res){
                    console.log(res);
                });
        }else{
            //调用阿里云返回url
            var files1 =document.getElementsByName('file_upload3');
            if(files1[index].files[0].size>1024*1024){
                var message = $filter('T')('20-200');
                ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                return;
            }

            cmsImageUpload.image_upload(files1[index].files[0]).then(function(data){
                //阿里云返回的url与id
                var url = data.data.result.url;
                var id = data.data.result.id;
                var temp = $resource(base_url+'cm/services/:serviceId',{},{update:{method:'put'}});
                var para1 = {serviceId:product.service_id};
                var para2 = {
                    service_img_url:url,
                    service_name:product.service_name,
                    service_desc:product.service_desc
                };
                temp.update(para1,para2,
                    function(data,headers){
                        //console.info("调用修改接口",data);
                        if(angular.isUndefined(data.error)){
                            //获取产品
                            $scope.getCompanyService(1);
                        }
                    },function(res){
                        console.log(res);
                    });
            });
        }
    }
    //点击取消修改产品按钮
    $scope.cancelProductEdit = function (product) {
        product.isAdd = false;
        //console.info("修改后",product);
        if(!angular.equals(product,$scope.productTemp)) {
            product.service_img_url = $scope.productTemp.service_img_url;
            product.service_name = $scope.productTemp.service_name;
            product.service_desc = $scope.productTemp.service_desc;
        }
    }
    //点击删除产品按钮
    $scope.productDelete = function (service_id) {
        $scope.title = '确定删除';
        ngDialog.open({
            scope: $scope,
            template: 'widget/dialog/dialog.html',
            background: 'white',
            controller: ['$scope', '$resource', function($scope, $resource) {
                $scope.ok = function(){
                    var url = base_url+'cm/services/:serviceId';
                    var param = {
                        serviceId:service_id
                    };
                    var headers = {'Authorization': window.localStorage.local_header};
                    var temp = $resource(url,{},{delete:{method:'DELETE',headers:headers}});
                    temp.delete(param,{},function(data,header){
                        //console.info('删除产品',data);
                        if(angular.isUndefined(data.error))
                        {
                            //获取产品
                            $scope.getCompanyService(1);
                            ngDialog.open({template: 'success',className:'short-message'});
                            $scope.getBannerImg();
                            $timeout(function () {
                                ngDialog.close();
                            },1000)
                        }
                        else {
                            var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                            ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                        }
                    });
                }
            }]
        });
    }
    //控制添加产品显示隐藏
    $scope.add_pros = false;
    //添加产品按钮
    $scope.isShow_pros = function () {
        $scope.isDirty = false;
        if($scope.oUpper.isProduct){
            return;
        }
        if(!$scope.add_pros){
            $scope.add_pros = !$scope.add_pros;
        }
    };
    //取消添加产品
    $scope.cancelAddProduct = function () {
        $scope.add_pros = false;
        $scope.addProduct = {};
        //取消时清除src
        $("#addProduct")[0].src = '';
    };
    //保存添加产品按钮
    $scope.saveAddProduct = function () {
        $scope.isDirty = true;
        //三项均填写
        if($scope.addProduct.url&&$scope.addProduct.name&&$scope.addProduct.desc){
            //调用阿里云返回url
            var files1 =document.getElementsByName('file_upload5');
            if(files1[0].files[0].size>1024*1024){
                var message = $filter('T')('20-200');
                ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                return;
            }
            cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
                //阿里云返回的url与id
                var url = data.data.result.url;
                var id = data.data.result.id;
                var headers = {'Authorization': window.localStorage.local_header};
                var temp = $resource(base_url+'cm/services',{},{save:{method:'POST',headers:headers}});
                var param = {
                    service_img_url:url,
                    service_name:$scope.addProduct.name,
                    service_desc:$scope.addProduct.desc,
                    company_id:$scope.companyId,
                    service_type:1
                };
                temp.save({},param, function(data,headers){
                    if(angular.isUndefined(data.error)){
                        //获取产品
                        $scope.getCompanyService(1);
                        $scope.add_pros = false;
                        $scope.addProduct = {};
                        $("#addProduct")[0].src = '';
                        ngDialog.open({template: 'success',className:'short-message'});
                        $timeout(function () {
                            ngDialog.close();
                        },1000);
                    }else {
                        var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                        ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                    }
                },function(res){
                    console.log(res);
                });
            });
        }
    }
    /*产品模块--end*/

    /*服务模块--start*/
    //点击编辑服务按钮
    $scope.serviceEdit = function (service) {
        for(var i = 0; i < $scope.services.length; i++){
            if( $scope.services[i].isAdd == true){
                break;
            }
        }
        if(i==$scope.services.length){
            service.isAdd = true;
            $scope.serviceTemp = angular.copy(service);
        }
    }
    //点击保存服务修改按钮
    $scope.saveServiceEdit = function (service,index) {
        if(angular.equals($scope.serviceTemp,service)){
            service.isAdd = false;
        }else if(angular.equals($scope.serviceTemp.service_img_url,service.service_img_url)){
            //调用接口修改
            var temp = $resource(base_url+'cm/services/:serviceId',{},{update:{method:'put'}});
            var para1 = {serviceId:service.service_id};
            var para2 = {
                service_name:service.service_name,
                service_desc:service.service_desc
            };
            temp.update(para1,para2,
                function(data,headers){
                    //console.info("调用修改接口",data);
                    if(angular.isUndefined(data.error)){
                        //获取服务
                        $scope.getCompanyService(2);
                    }
                },function(res){
                    console.log(res);
                });
        }else {
            //调用阿里云返回url
            var files1 =document.getElementsByName('file_upload4');
            if(files1[index].files[0].size>1024*1024){
                var message = $filter('T')('20-200');
                ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                return;
            }
            cmsImageUpload.image_upload(files1[index].files[0]).then(function(data){
                //阿里云返回的url与id
                var url = data.data.result.url;
                var id = data.data.result.id;
                var temp = $resource(base_url+'cm/services/:serviceId',{},{update:{method:'put'}});
                var para1 = {serviceId:service.service_id};
                var para2 = {
                    service_img_url:url,
                    service_name:service.service_name,
                    service_desc:service.service_desc
                };
                temp.update(para1,para2,
                    function(data,headers){
                        //console.info("调用修改接口",data);
                        if(angular.isUndefined(data.error)){
                            //获取服务
                            $scope.getCompanyService(2);
                        }
                    },function(res){
                        console.log(res);
                    });
            });
        }
    }
    //点击取消修改服务按钮
    $scope.cancelServiceEdit = function (service) {
        service.isAdd = false;
        if(!angular.equals(service,$scope.serviceTemp)) {
            service.service_img_url = $scope.serviceTemp.service_img_url;
            service.service_name = $scope.serviceTemp.service_name;
            service.service_desc = $scope.serviceTemp.service_desc;
        }
    }
    //点击删除服务按钮
    $scope.serviceDelete = function (service_id) {
        $scope.title = '确定删除';
        ngDialog.open({
            scope: $scope,
            template: 'widget/dialog/dialog.html',
            background: 'white',
            controller: ['$scope', '$resource', function($scope, $resource) {
                $scope.ok = function(){
                    var url = base_url+'cm/services/:serviceId';
                    var param = {
                        serviceId:service_id
                    };
                    var headers = {'Authorization': window.localStorage.local_header};
                    var temp = $resource(url,{},{delete:{method:'DELETE',headers:headers}});
                    temp.delete(param,{},function(data,header){
                        // console.info('删除产品',data);
                        if(angular.isUndefined(data.error))
                        {
                            //获取产品
                            $scope.getCompanyService(2);
                            ngDialog.open({template: 'success',className:'short-message'});
                            $scope.getBannerImg();
                            $timeout(function () {
                                ngDialog.close();
                            },1000)
                        }
                        else {
                            var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                            ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                        }
                    });
                }
            }]
        });
    }
    /*服务的数据*/
    //控制添加服务的显示隐藏
    $scope.add_service = false;
    $scope.addService = {
        url:'',
        name:'',
        desc:''
    };
    //添加服务按钮
    $scope.isShow_service = function () {
        $scope.isDirty_service = false;
        if($scope.oUpper.isService){
            return;
        }
        if(!$scope.add_service){
            $scope.add_service = !$scope.add_service;
        }
    };
    //取消添加服务按钮
    $scope.cancelAddService = function () {
        $scope.add_service = false;
        $scope.addService = {};
        //取消时清除src
        $("#addService")[0].src = '';
    }
    //保存添加服务按钮
    $scope.saveAddService = function () {
        $scope.isDirty_service = true;
        //三项均填写
        if($scope.addService.url&&$scope.addService.name&&$scope.addService.desc){
            //调用阿里云返回url
            var files1 =document.getElementsByName('file_upload6');
            if(files1[0].files[0].size>1024*1024){
                var message = $filter('T')('20-200');
                ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                return;
            }
            cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
                //阿里云返回的url与id
                var url = data.data.result.url;
                var id = data.data.result.id;
                var headers = {'Authorization': window.localStorage.local_header};
                var temp = $resource(base_url+'cm/services',{},{save:{method:'POST',headers:headers}});
                var param = {
                    service_img_url:url,
                    service_name:$scope.addService.name,
                    service_desc:$scope.addService.desc,
                    company_id:$scope.companyId,
                    service_type:2
                };
                temp.save({},param, function(data,headers){
                    if(angular.isUndefined(data.error)){
                        //获取产品
                        $scope.getCompanyService(2);
                        $scope.add_service = false;
                        $scope.addService = {};
                        $("#addService")[0].src = '';
                        ngDialog.open({template: 'success',className:'short-message'});
                        $timeout(function () {
                            ngDialog.close();
                        },1000);
                    }else {
                        var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                        ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                    }
                },function(res){
                    console.log(res);
                });
            });
        }
    }
    /*服务模块--end*/

    $scope.images = [];
    //获取公司名片等基本信息
    $scope.getCompanyInfo = function () {
        var url  = base_url+'cm/companies/information/:companyId';
        var param = {
            companyId:$scope.companyId,
            "_":new Date().getTime()
        };
        // var headers = {'Authorization': window.localStorage.local_header};
        //var query = $resource(url,{},{get:{method:'get',headers:headers}});
        var query = $resource(url);
        query.get(param,{},function(data){
            //console.info("新的企业信息",data);
            if(angular.isUndefined(data.error)){
                $scope.cardInfo.introduce = data.result.company_introduce;
                $scope.cardInfo.achievement = data.result.company_achievement;
                $scope.cardInfo.name = data.result.company_name;
                $scope.cardInfo.address = data.result.company_address;
                $scope.cardInfo.mode = data.result.company_mode;
                $scope.cardInfo.range = data.result.company_range;
                $scope.cardInfo.contact = data.result.contact;
                $scope.cardInfo.phone = data.result.company_phone;
                $scope.cardInfo.web = data.result.website;
                if(data.result.logo_image){
                    $scope.cardInfo.logoSrc = data.result.logo_image;
                }
            }
        },function(res){
            console.log(res);
        });
    }
    /*这是点击编辑，开启编辑状态，并且采用copy深拷贝一份企业名片信息*/
    $scope.isShow_edit = function(){
        if(!$scope.card_edit){
            $scope.card_edit = !$scope.card_edit;
            $scope.temp = angular.copy($scope.cardInfo);
        }
    }
    /*取消按钮需要判断，用户是否修改了cardInfo的值*/
    $scope.cancel_edit = function(){
        $scope.temp = null;
        $scope.card_edit = false;
    }
    //提交后台更新企业名片信息
    $scope.cardInfoUpdate = function () {
        var temp = $resource(base_url+'cm/companies/:companyId',{language:"@language"},{update:{method:'put'}});

        var para1 = {
            companyId:$scope.companyId,
            language:window.localStorage.lang
        };
        var para2 = {
            company_name: $scope.temp.name,
            company_address:$scope.temp.address,
            manger_mode:$scope.temp.mode,
            contact:$scope.temp.contact,
            company_phone:$scope.temp.phone,
            company_website: $scope.temp.web,
            category:$scope.temp.range
        };

        temp.update(para1,para2,
            function(data,headers){
                //console.info("更新",data);
            },function(res){
                console.log(res);
            });
    }
    /*如果用户有修改的话，调用接口*/
    $scope.update_card = function(){
        if(!angular.equals($scope.cardInfo,$scope.temp))
        {
            //这个时候调用修改接口
            $scope.cardInfoUpdate();
            //$scope.card_edit = false;
        }else{
            $scope.card_edit = false;
        }
    }

    //后台获取宣传栏图列表 与获取荣誉截图一个后台接口 根据参数调用
    $scope.getBannerImg = function (type) {
        var len = arguments.length;
        if(len==0){
            type = '2';
        }
        var url  = base_url+'cm/companies/:companyId/imgs';
        var param = {
            companyId:$scope.companyId,
            type:type,
            "_":new Date().getTime()
        };
        // var headers = {'Authorization': window.localStorage.local_header};
        //var query = $resource(url,{},{get:{method:'get',headers:headers}});
        var query = $resource(url);
        query.get(param,{},function(data){
            //console.info("宣传栏图片",data);
            if(data.result){
                if(len==0){
                    $scope.images = data.result;
                    if($scope.oUpper.banner <= data.result.length){
                        $scope.oUpper.isBanner = true;
                    }else {
                        $scope.oUpper.isBanner = false;
                    }
                }else {
                    $scope.honorInfos = data.result;
                    if($scope.oUpper.honor <= data.result.length){
                        $scope.oUpper.isHonor = true;
                    }else{
                        $scope.oUpper.isHonor = false;
                    }
                }

            }
        },function(res){
            console.log(res);
        });
    }
    //调用后台删除图片接口
    $scope.deleteImg = function (img) {
        var url = base_url+'cm/companies/:companyId/imgs/:imgId';
        var param = {
            companyId:img.company_id,
            imgId:img.id
        };
        var headers = {'Authorization': window.localStorage.local_header};
        var temp = $resource(url,{},{delete:{method:'DELETE',headers:headers}});
        temp.delete(param,{},function(data,header){
            //console.info('删除banner图',data);
            if(angular.isUndefined(data.error))
            {
                ngDialog.open({template: 'success',className:'short-message'});
                if(img.image_type == 1){
                    $scope.getHonorImg();
                }else if(img.image_type == 2){
                    $scope.getBannerImg();
                }
                $timeout(function () {
                    ngDialog.close();
                },1000)

            }
            else {
                var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
            }
        });
    }
    //删除bannerimg或者honorimg,根据image_type获取列表
    $scope.deleteBannerImg = function (img) {
        //console.info(img);
        $scope.deleteImg(img);
    }


    //获取企业产品和服务,共用一个接口
    $scope.getCompanyService = function (state) {
        var url  = base_url+'cm/services/:companyId';
        var param = {
            companyId:$scope.companyId,
            state:state,
            "_":new Date().getTime()
            // language:window.localStorage.lang
        };
        var query = $resource(url);
        query.get(param,{},function(data){
            //console.info("企业服务和产品",data.result);
            if(data.result){
                if(state == 1){
                    $scope.products = data.result;
                    //console.info("products数据",$scope.products);
                    //console.info("保存的产品",$scope.products);
                    if($scope.oUpper.product<=data.result.length){
                        $scope.oUpper.isProduct = true;
                    }else {
                        $scope.oUpper.isProduct = false;
                    }
                }else if(state == 2){
                    $scope.services = data.result;
                    if($scope.oUpper.service<=data.result.length){
                        $scope.oUpper.isService = true;
                    }else {
                        $scope.oUpper.isService = false;
                    }
                }
            }
        },function(res){
            console.log(res);
        });
    }

    //修改企业简介或者业绩，共用一个接口
    $scope.changeCmInfo = function (type) {
        var temp = $resource(base_url+'cm/companies/information/:companyId',{},{update:{method:'put'}});
        var para1 = {companyId:$scope.companyId};
        var content = '';
        if(type==1){
            content = $scope.copy_comIntro;
        }else{
            content = $scope.copy_comAchiev;
        }
        //console.info("传送的内容",content);
        var para2 = {
            "updateContent":content,
            "companyAchievOrIntroduce":type
        };

        temp.update(para1,para2,
            function(data,headers){
                if(angular.isUndefined(data.error)){
                    if(type == 1){
                        $scope.isCancel_ComIntro();
                    }else if(type == 2){
                        $scope.isCancel_ComInfo();
                    }
                    //获取公司信息
                    $scope.getCompanyInfo();
                }
            },function(res){
                console.log(res);
            });
    }
    //公司简介
    $scope.copy_comIntro = '';
    $scope.myVar1 = true ;
    /*图片按钮的切换*/
    $scope.myVars1 = function(){
        if($scope.myVar1){
            $scope.myVar1 = !$scope.myVar1;
            $scope.copy_comIntro = angular.copy($scope.cardInfo.introduce);
        }
    };
    /*取消按钮的切换*/
    $scope.isCancel_ComIntro = function () {
        $scope.copy_comIntro = '';
        $scope.myVar1 = true ;
    }
    /*保存按钮的切换*/
    $scope.saveCmIntroduce = function () {
        //如果有修改调用后台接口,否则直接调用取消的方法
        if(!angular.equals($scope.copy_comIntro,$scope.cardInfo.introduce)){
            //调用接口
            $scope.changeCmInfo(1);
        }else{
            $scope.isCancel_ComIntro();
        }
    }
    //公司业绩
    $scope.copy_comAchiev = '';
    $scope.myVar2 = true ;
    /*图片按钮的切换*/
    $scope.myVars2 = function(){
        if($scope.myVar2){
            $scope.myVar2 = false;
            $scope.copy_comAchiev = angular.copy($scope.cardInfo.achievement);
        }
    };
    /*取消按钮的切换*/
    $scope.isCancel_ComInfo = function () {
        $scope.copy_comAchiev = '';
        $scope.myVar2 = true;
    }
    /*保存调用接口*/
    $scope.saveComInfo = function () {
        //如果有修改调用后台接口,否则直接调用取消的方法
        if(!angular.equals($scope.copy_comAchiev,$scope.cardInfo.achievement)){
            //调用接口
            $scope.changeCmInfo(2);
        }else{
            $scope.isCancel_ComInfo();
        }
    }
    //后台获取荣誉截图
    $scope.getHonorImg = function () {
        $scope.getBannerImg("1");
    }

    /*上传图片部分*/
    //上传宣传栏图片
    $scope.uploadBannerImg = function ($event) {
        if($scope.oUpper.isBanner){
            $event.preventDefault();
            return;
        }
        var files1 =document.getElementsByName('file_upload1');
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            //console.info("阿里云上传图片返回",data);
            // $scope.identityImage = data.data.result.url;
            var addBannerImgUrl = data.data.result.url;
            var addBannerImgId = data.data.result.id;
            //调用接口，增加宣传栏图片
            var url = base_url+'cm/companies/:companyId/imgs';
            var param = {
                companyId:$scope.companyId,
                image_type:2,
                image_url:addBannerImgUrl,
                image_index:$scope.images.length+1,
                image_desc:''
            }
            var headers = {'Authorization': window.localStorage.local_header};
            var temp = $resource(url,{companyId:'@companyId'},{save:{method:'POST',headers:headers}});
            temp.save({},param,function(data,header){
                //console.info("增加宣传栏图片",data);
                if(angular.isUndefined(data.error))
                {
                    //获取宣传栏图片
                    $scope.getBannerImg();
                    ngDialog.open({template: 'success',className:'short-message'});
                    $timeout(function () {
                        ngDialog.close();
                    },1000);
                }
                else {
                    var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                    ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                }
            });

        });
    }
    //使用jq的方法的绑定onchange事件
    $("#fileLoad1").on('change',function() {
        var files1 =document.getElementsByName('file_upload1');
        if(files1[0].files[0].size>1024*1024){
            var message = $filter('T')('20-200');
            ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
        }else {
            $scope.uploadBannerImg();
        }
    });
    //上传荣誉图片
    $scope.addHonorImgDefault = 'company/image/honerBg.jpg';
    $scope.uploadHonorImg = function () {
        if($scope.oUpper.isHonor){
            return;
        }
        var files1 =document.getElementsByName('file_upload2');
        if(files1[0].files[0].size>1024*1024){
            var message = $filter('T')('20-200');
            ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
            return;
        }
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            //console.info("阿里云上传图片返回",data);
            // $scope.identityImage = data.data.result.url;
            var addBannerImgUrl = data.data.result.url;
            var addBannerImgId = data.data.result.id;
            //调用接口，增加宣传栏图片
            var url = base_url+'cm/companies/:companyId/imgs';
            var param = {
                companyId:$scope.companyId,
                image_type:1,
                image_url:addBannerImgUrl,
                image_index:$scope.honorInfos.length+1,
                image_desc:'  '
            }
            var headers = {'Authorization': window.localStorage.local_header};
            var temp = $resource(url,{companyId:'@companyId'},{save:{method:'POST',headers:headers}});
            temp.save({},param,function(data,header){
                //console.info("增加宣传栏图片",data);
                if(angular.isUndefined(data.error))
                {
                    //获取荣誉截图
                    $scope.getHonorImg();
                    $scope.addHonorImg = '';
                    $scope.myHonorFile = '';
                    ngDialog.open({template: 'success',className:'short-message'});
                    $timeout(function () {
                        ngDialog.close();
                    },1000);
                }
                else {
                    var message = $filter('T')(data.error.code+""+data.error.error_subcode);
                    ngDialog.open({data:{'message':message},template: 'message',className:'short-message'});
                }
            });
        });
    }
    //初始化函数
    $scope.init = function (){
        //获取公司信息
        $scope.getCompanyInfo();
        //获取宣传栏图片
        $scope.getBannerImg();
        //获取荣誉截图
        $scope.getHonorImg();
        //获取产品
        $scope.getCompanyService(1);
        //获取服务
        $scope.getCompanyService(2);
    }
    //初始化函数运行
    $scope.init();

    //查看功能按钮
    $scope.viewInfo = function () {
        //window.open(window.location.href.substr(0,window.location.href.indexOf('#')+1)+"homepage/companyShow?companyId=6204277236867010560");
        $state.go('homepage.companyShow1',{
            companyId:$scope.companyId
        });
    }
});

