/**
 * 路由管理
 */
App.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/homePage');
    $stateProvider
        .state("login",{
            cache: false,
            url : "/login",
            templateUrl : "logReg/login/pages/login.html",
            controller : "loginCtr",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(["logReg/login/js/loginCtr.js"]);
                }]
            }
        })
        .state('homePage', {
            cache: false,
            url : "/homePage",
            views:{
                '':{
                    templateUrl: 'homePage/homePage.html',
                    controller:'homePageCtr',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/js/homePageCtr.js","homePage/css/homePage.css"]);
                        }]
                    }
                },
                'mainBody@homePage':{
                    templateUrl: 'homePage/mainBody/pages/mainBody.html',
                    controller:'mainBodyCtr',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/mainBody/js/mainBodyCtr.js","homePage/mainBody/css/mainBody.css"]);
                        }]
                    }
                }
            }
        })
        /*后台管理路由*/
        .state('homePage.backStage',{
            cache: false,
            url : "/backStage",
            views:{
                'mainBody@homePage': {
                    templateUrl: 'backStageManage/backStage.html',
                    /*controller: 'bacStageCtr',*/
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/css/bacStage.css"]);
                        }]
                    }
                }
            }
        })
        /*展会管理*/
        .state('homePage.backStage.companyShow',{
            cache: false,
            url : "/companyShow",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/companyShowInfo.html',
                    controller: 'companyShowInfoCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/companyShowInfoCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*企业名片*/
        .state('homePage.backStage.companyInfoManage',{
            cache: false,
            url : "/companyInfoManage",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/companyInfoManage.html',
                    controller: 'companyInfoManageCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/companyInfoManageCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*企业轮播图管理*/
        .state('homePage.backStage.carouselManage',{
            cache: false,
            url : "/carouselMange",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/carouselMange.html',
                    controller: 'carouselMangeCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/carouselMangeCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*添加企业轮播图*/
        .state('homePage.backStage.addCarousel',{
            cache: false,
            url : "/addCarousel",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/addCarousel.html',
                    controller: 'addCarouselCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/addCarouselCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*主营产品*/
        .state('homePage.backStage.productManage',{
            cache: false,
            url : "/productManage",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/productManage.html',
                    controller: 'productManageCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/productManageCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*添加主营产品*/
        .state('homePage.backStage.addProduct',{
            cache: false,
            url : "/addProduct",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/addProduct.html',
                    controller: 'addProductCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/addProductCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*公司荣誉管理*/
        .state('homePage.backStage.companyHonourManage',{
            cache: false,
            url : "/companyHonourManage",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/companyHonourManage.html',
                    controller: 'companyHonourManageCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/companyHonourManageCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*添加公司荣誉*/
        .state('homePage.backStage.addCompanyHonour',{
            cache: false,
            url : "/addCompanyHonour",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/companyShowManage/pages/addCompanyHonour.html',
                    controller: 'addCompanyHonourCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/companyShowManage/js/addCompanyHonourCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*活动与资讯管理*/
        .state('homePage.backStage.activityNewsManage',{
            cache: false,
            url : "/activityNewsManage",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/activityNews/pages/activityNewsManage.html',
                    controller: 'activityNewsManageCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/activityNews/js/activityNewsManageCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*活动与资讯管理添加*/
        .state('homePage.backStage.addActivityNews',{
            cache: false,
            url : "/addActivityNews",
            views:{
                'rightDetails@homePage.backStage': {
                    templateUrl: 'backStageManage/activityNews/pages/addActivityNews.html',
                    controller: 'addActivityNewsCtr',
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/companyShowManage/css/companyShowInfo.css",
                                "backStageManage/activityNews/js/addActivityNewsCtr.js"]);
                        }]
                    }
                }
            }
        })
        /*---------展会模块-------*/
        .state("homePage.companyShow", {
            url: '/companyShow',
            views:{
                'mainBody@homePage':{
                    templateUrl:'companyShow/pages/companyShow.html',
                    controller:'companyShowCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyShowCtr.js','companyShow/css/companyShow.css']);
                }]
            }
        })
        .state("homePage.companyShow.companyShowIndex", {
            url: '/companyShowIndex',
            views:{
                'companyInfo':{
                    templateUrl:'companyShow/pages/companyShowIndex.html',
                    controller:'companyShowIndexCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyShowIndexCtr.js']);

                }]
            }
        })
        //企业展示2公司介绍
        .state("homePage.companyShow.companyShowIntroduce", {
            url: '/companyShowIntroduce',
            views:{
                'companyInfo@homepage.companyShow':{
                    templateUrl:'companyShow/pages/companyShowIntroduce.html',
                    controller:'companyShowIntroduceCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyShowIntroduceCtr.js']);

                }]
            }
        })
        //企业展示2公司动态
        .state("homePage.companyShow.companyDynamic", {
            url: '/companyDynamic',
            views:{
                'companyInfo@homepage.companyShow':{
                    templateUrl:'companyShow/pages/companyDynamic.html',
                    controller:'companyShowDynamicCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyShowDynamicCtr.js']);

                }]
            }
        })
        //企业展示2产品／服务
        .state("homePage.companyShow.companyProduct", {
            url: '/companyProduct',
            views:{
                'companyInfo@homepage.companyShow':{
                    templateUrl:'companyShow/pages/companyProduct.html',
                    controller:'companyProductCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyProductCtr.js']);

                }]
            }
        })
        //企业展示2动态详情
        .state("homePage.companyShow.companyDynamicDetail", {
            url: '/companyDynamicDetail',
            views:{
                'companyInfo@homepage.companyShow':{
                    templateUrl:'companyShow/pages/companyDynamicDetail.html',
                    controller:'companyShowDynamicDetailCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['companyShow/js/companyDynamicDetailCtr.js']);
                }]
            }
        })
        /*--------产品以及公司列表页--------*/
        //公司列表页
        .state("homePage.companySearch", {
            cache:false,
            url: '/companySearch',
            views:{
                'mainBody@homePage':{
                    templateUrl:'list/pages/companys.html',
                    controller:'companysCtr'
                }
            },
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(['list/css/list.css','list/js/companysCtr.js']);
                }]
            }
        })

});

