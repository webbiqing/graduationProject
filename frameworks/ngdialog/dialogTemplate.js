var dialog_templates = angular.module('dialog.templates',[]);

dialog_templates.run(['$templateCache', function($templateCache) {
	
    $templateCache.put('message', '<div style="text-align:center">{{ngDialogData.message}}</div>');
    
    $templateCache.put('right_message', '<img src="image/right2.png" />{{ngDialogData.right_message}}');
    
    $templateCache.put('wrong_message', '<img src="image/right2.png" />{{ngDialogData.wrong_message}}');
    
    $templateCache.put('update_success', '<img src="image/right2.png" />修改成功');

    $templateCache.put('send_success', '<img src="image/right2.png" />发送成功');
    
    $templateCache.put('delete_success', '<img src="image/right2.png" />删除成功');
    
    $templateCache.put('add_success', '<img src="image/right2.png" />新增成功');
    
    $templateCache.put('service_error', '服务器连接失败');
    
    $templateCache.put('success', '<img src="image/right2.png" />操作成功');
    
    $templateCache.put('login', '<img src="image/right2.png" />请重新登陆');
    
}]);