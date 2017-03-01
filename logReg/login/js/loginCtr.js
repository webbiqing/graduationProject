/*
 * 登录控制器
 * 管理员账号类型 为 1
 *
 * 企业账号类型 为 2
 *
 * 个人账号类型 为 3
 */
App.controller('loginCtr', function( $scope,$state) {

    var hasRegister =[{
        userName : 'admin',
        password : 'admin',
        loginType : 1
    },{
        userName : 'wbqing',
        password : 'wbiqing',
        loginType : 2
    }];

    var userLoginType;
    function isLogin(userName,password){
        var flag = false;
        angular.forEach(hasRegister,function(val,key){
            if(userName == val.userName){
                if(password == val.password){
                    userLoginType = val.loginType;
                    flag = true;
                }
            }
        });
        return flag;
    }
    $scope.login = function (user) {
        if(!user){
            alert('请输入用户名和密码！');
            return
        }
        if(isLogin(user.userName,user.password)){
            window.localStorage.user_name    = user.userName;
            window.localStorage.login_type   =  userLoginType;

            console.log('userType',window.localStorage.login_type);
            $state.go('homePage');
        }else{
            alert("您输入的用户名/密码不正确，请联系管理员！");
        }
    }
})
