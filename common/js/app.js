/**
 * 主启动app.js
 */

//angular启动
angular.element(document).ready(function(){
    angular.bootstrap(document,['myApp']);
});

var App = angular.module('myApp',
    [
        'ui.router',
        'ngResource',
        'ngDialog',
        'oc.lazyLoad',
        'chieffancypants.loadingBar',
        'ksSwiper',
        'serviceModule'
    ]);

//配置头部缓冲进度条
App.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
});

App.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        App.controller = $controllerProvider.register;
        App.directive  = $compileProvider.directive;
        App.filter     = $filterProvider.register;
        App.factory    = $provide.factory;
        App.service    = $provide.service;
        App.constant   = $provide.constant;
    }]);

/*
App.run(function($rootScope, $state,$templateCache) {数据
    permissionService.setPermissions(window.localStorage.role_names);

    //设置ngDialog缓存
    setNgDialogCache($templateCache);

    ///监听路由切换开始事件：路由级别的权限控制
    addRouterStartListener($rootScope,$state);

    //监听路由切换成功事件：设置滚动条（window and div）
    addRouterSuccessListener($rootScope);
});*/

