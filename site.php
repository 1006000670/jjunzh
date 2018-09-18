<?php
/**
 * 青岛淘码互联网科技有限公司
 *
 * @author 青岛淘码互联网科技有限公司
 * @url 
 */
defined('IN_IA') or exit('Access Denied');


class Junzh_byyModuleSite extends WeModuleSite {

	public $settings;

	

	public function doWebmembercard() {
		global $_W, $_GPC;
		//WEB 列表
			
		
		include $this->template('couponexchange');
	}

	public function doMobileIndex() {
		global $_W, $_GPC;
		
		/* $fans = mc_oauth_userinfo();
		
		if(is_error($fans) || empty($fans)) {
			message('获取粉丝信息失败', '', 'error');
		} */
		include $this->template('index');
	}
	
	public function doMobileUpload(){
		global $_W, $_GPC;
		 $data = $_GPC['base64'];
    //preg_match("/data:image\/(.*);base64,/", $data, $res);
    //$ext = $res[1];

   
    $file = $_GPC['template_url'];
   // $data = preg_replace("/data:image\/(.*);base64,/", "", $data);
    if (file_put_contents(MODULE_ROOT . "/img/" . $file, base64_decode($data)) == false) {
    echo json_encode(array('src' => "上传错误。。", 'size' => $_GPC['template_rectangle'], "error" => 1));
    } else {
    echo json_encode(array('src' => $_W['siteroot'] . "addons/junzh_byy/img/" . $file, 'size' => $_GPC['template_rectangle'], "error" => 0));
    }
   
		
		
		
	}
	
}
