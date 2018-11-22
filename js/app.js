
(function($, owner) {
	/**
	 * 用户登录
	 **/
//	var server = 'http://192.168.1.102:8080';
	var server = 'http://www.36le.com';
	
	owner.wainshow = function () {
	    if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
	        mui.toast("网络异常，请检查网络设置！");
	        return false;
	
	    } else {
	     //   mui.toast("网络正常");
	        return true;
	    }
	}
	//获取设备id
	owner.getPushInfo = function (){
	    var info = plus.push.getClientInfo();
	    /*outSet( "获取客户端推送标识信息：" );
	    outLine( "token: "+info.token );
	    outLine( "clientid: "+info.clientid );
	    outLine( "appid: "+info.appid );
	    outLine( "appkey: "+info.appkey );*/
	    return info.clientid;
	}
	//登录
	owner.login = function(loginInfo, callback,errFun) {
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length != 11) {
			plus.nativeUI.toast('请输入有效手机号');
			return;
		}
		if (loginInfo.password.length < 6) {
			plus.nativeUI.toast('密码最短为 6 个字符');
			return;
		}
		$.ajax({
			url: server+'/login',
            dataType: 'json',
            data: loginInfo,
            timeout: 10000, //超时时间设置为10秒；
            type: 'post',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            success: function(data){
            	mui('button').button('reset');
            	//获取设备类型
            	if(mui.os.android){
            		data.devicetype = 'android';
            	}else{
            		data.devicetype = 'ios';
            	}
            	//登录成功后获取设备信息
            	//data.deviceId = owner.getPushInfo();
            	return callback(data);
            },
			error: function(msg,type) {
				mui('button').button('reset');
				var erruser =  owner.getUser();
            	erruser.memid = '';
            	erruser.token = '';
            	owner.setUser(erruser);
            	console.log('登录失败');
            	if(type == 'abort'){
					mui.toast('网络异常，请检查网络设置！');
				}else if(type == 'timeout'){
					mui.toast('请求超时，请稍后再试');
				}else if(type == 'parsererror'){
					mui.toast('返回数据格式错误');
				}else{
					mui.toast('网络连接失败');
				}
            	if(errFun){
            		errFun(msg,type);
            	}
            }
		})
	};
	/**
	 * 新用户注册
	 * 
	 **/
	owner.reg = function(vueObj,callback){
		$.ajax({
	        url: server+'/reg/user',
	        dataType: 'json',
	        data: vueObj,
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        success: function(data) {
	        	if(data.r<0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	         	return callback(data);
	        },
	        error: function(xhr, type, errorThrown) {
	     		// 请求失败
	     		if(type == 'abort'){
					mui.toast('网络异常，请检查网络设置！');
				}else if(type == 'timeout'){
					mui.toast('请求超时，请稍后再试');
				}else if(type == 'parsererror'){
					mui.toast('返回数据格式错误');
				}else{
					mui.toast('网络连接失败');
				}
	     		console.log(JSON.parse(xhr.response).r.msg)
	         	/*mui.alert('注册错误','注册',function(){
	         		
	         	})*/
	        }
	    });
	}
	
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('请输入11位手机号码');
		}
		return callback(null, '新的随机密码已经发送到您的手机，请查收。');
	};

	/**
	 * 设置应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 获取应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	//新用户
	owner.setnewUser = function(newUser) {
		newUser = newUser || {};
		localStorage.setItem('_newUser_',JSON.stringify(newUser));
	}
	owner.getnewUser = function() {
		var newUserText = localStorage.getItem('_newUser_') || "{}";	
		return JSON.parse(newUserText);
	}
	//本地储存用户
	owner.setUser = function(user) {
		user = user || {};
		localStorage.setItem('_user_',JSON.stringify(user));
	}
	owner.getUser = function() {
		var userText = localStorage.getItem('_user_') || "{}";	
//		return JSON.parse(userText);
		var user= JSON.parse(userText);
		if(user.type)
			return user;			    
		else{
		   user.type=2;
		   return user;
		}
	}
	//片方任务
	owner.setPfTask = function(pfTask) {
		pfTask = pfTask || {};
		localStorage.setItem('_pianfang_task_',JSON.stringify(pfTask));
	}
	owner.getPfTask = function() {
		var pfTaskText = localStorage.getItem('_pianfang_task_') || "{}";	
		return JSON.parse(pfTaskText);
	}
	//基点任务
	owner.setJdTask = function(jdTask) {
		jdTask = jdTask || {};
		localStorage.setItem('_jidian_task_',JSON.stringify(jdTask));
	}
	owner.getJdTask = function() {
		var jdTaskText = localStorage.getItem('_jidian_task_') || "{}";	
		return JSON.parse(jdTaskText);
	}
	//基点包场
	owner.setJdChang = function(jdChang) {
		jdChang = jdChang || {};
		localStorage.setItem('_jidian_chang_',JSON.stringify(jdChang));
	}
	owner.getJdChang = function() {
		var jdChangText = localStorage.getItem('_jidian_chang_') || "{}";	
		return JSON.parse(jdChangText);
	}
	//movie id
	owner.setMovieId = function(movieId) {
		movieId = movieId || "";
		localStorage.setItem('__movieinfo_',movieId);
	}
	owner.getMovieId = function() {
		var movieIdText = localStorage.getItem('__movieinfo_') || "";	
		return movieIdText;
	}
	owner.removeMovieId = function() {
		localStorage.removeItem('__movieinfo_');	
	}
	//包场任务id
	owner.setChangId = function(changId) {
		changId = changId || "";
		localStorage.setItem('__changId_',changId);
	}
	owner.getChangId = function() {
		var changIdText = localStorage.getItem('__changId_') || "";	
		return changIdText;
	}
	owner.removeChangId = function() {
		localStorage.removeItem('__changId_');	
	}
	//会员单独的个人信息
	owner.setBranchMem = function(branchMem) {
		branchMem = branchMem || {};
		localStorage.setItem('_branchMem_',JSON.stringify(branchMem));
	}
	owner.getBranchMem = function() {
		var branchMemText = localStorage.getItem('_branchMem_') || "{}";	
		return JSON.parse(branchMemText);
	}
	//储存影厅list
	owner.setTings = function(tings) {
		tings = tings || [];
		localStorage.setItem('_tings_',JSON.stringify(tings));
	}
	owner.getTings = function() {
		var tingsText = localStorage.getItem('_tings_') || "[]";	
		return JSON.parse(tingsText);
	}
	
	//厅号
	owner.setTingHao = function(tingHao) {
		tingHao = tingHao || "";
		localStorage.setItem('_tingHao_',tingHao);
	}
	owner.getTingHao = function() {
		var tingHaoText = localStorage.getItem('_tingHao_') || "";	
		return tingHaoText;
	}
	owner.removeTingHao = function() {
		localStorage.removeItem('_tingHao_');	
	}
	//为了注册成功后能跳转到首页并刷新数据
	owner.setMainTab = function(main) {
		main = main || {};
		localStorage.setItem('_maintab_',JSON.stringify(main));
	}
	owner.getMainTab = function() {
		var userText = localStorage.getItem('_maintab_') || "{}";
		return JSON.parse(userText);
	}
	owner.setCinema = function(cinema) {
		cinema = cinema || {};
		localStorage.setItem('_cinema_',JSON.stringify(cinema));
	}
	owner.getCinema= function() {
		var cinemaText = localStorage.getItem('_cinema_') || "{}";
		return JSON.parse(cinemaText);
	}
	owner.setMsgObj = function(myMsg) {
		myMsg = myMsg || {};
		localStorage.setItem('_msgObj_',JSON.stringify(myMsg));
	}
	owner.getMsgObj= function() {
		var myMsgText = localStorage.getItem('_msgObj_') || "{}";
		return JSON.parse(myMsgText);
	}
	//设置默认银行卡
	owner.setCurCard = function(curCard) {
		curCard = curCard || {};
		localStorage.setItem('_curCard_',JSON.stringify(curCard));
	}
	owner.getCurCard = function() {
		var curCardText = localStorage.getItem('_curCard_') || "{}";
		return JSON.parse(curCardText);
	}
	//礼品id
	owner.setGiftId = function(giftId) {
		giftId = giftId || "";
		localStorage.setItem('_giftId_',giftId);
	}
	owner.getGiftId = function() {
		var giftIdText = localStorage.getItem('_giftId_') || "";	
		return giftIdText;
	}
	//广告banner id
	owner.setAdId = function(adId) {
		adId = adId || "";
		localStorage.setItem('_adId_',adId);
	}
	owner.getAdId = function() {
		var adIdText = localStorage.getItem('_adId_') || "";	
		return adIdText;
	}
	//活动 id
	owner.setActiId = function(actiId) {
		actiId = actiId || "";
		localStorage.setItem('_actiId_',actiId);
	}
	owner.getActiId = function() {
		var actiIdText = localStorage.getItem('_actiId_') || "";	
		return actiIdText;
	}
	//头条
	owner.setCast = function(cast) {
		cast = cast || {};
		localStorage.setItem('_cast_',JSON.stringify(cast));
	}
	owner.getCast = function() {
		var castText = localStorage.getItem('_cast_') || "{}";	
		return JSON.parse(castText);
	}
	
	
	owner.mainPage = function (m){ 
		$.openWindow({
			url: m+'.html',
			id: m,
			show: {
				aniShow: 'pop-in'
			},
			styles: {
				popGesture: 'close'
			},
			waiting: {
				autoShow: false
			}
		});
	}
	owner.afterList = function (newArr,dataArr){//将data的数据添加到new后面
		for (var i=0; i < dataArr.length; i++) {
			newArr.push( dataArr[i] );
		}
	}
	//判断是否有沉浸式状态栏功能
	owner.Immersed = function (headerEl){
		var barHeight = 0;
	    if(plus.navigator.isImmersedStatusbar()){// 兼容immersed状态栏模式
	        // 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
	        barHeight = plus.navigator.getStatusbarHeight();
	    }
	    return barHeight;
	}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
	
	owner.GetDateDiff = function (startTime, endTime, diffType) {
	    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	    startTime = startTime.replace(/\-/g, "/");
	    endTime = endTime.replace(/\-/g, "/");
	    //将计算间隔类性字符转换为小写
	    diffType = diffType.toLowerCase();
	    var sTime =new Date(startTime); //开始时间
	    var eTime =new Date(endTime); //结束时间
	    //作为除数的数字
	    var timeType =1;
	    switch (diffType) {
	        case"second":
	            timeType =1000;
	        break;
	        case"minute":
	            timeType =1000*60;
	        break;
	        case"hour":
	            timeType =1000*3600;
	        break;
	        case"day":
	            timeType =1000*3600*24;
	        break;
	        default:
	        break;
	    }
	    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
	}
	//日期格式化   在日期原型中设置方法
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	//图片缓存至本地
	
	owner.localUrl = function(loadUrl){
		var filename = loadUrl.substring(loadUrl.lastIndexOf("/") + 1, loadUrl.length);
        var relativePath = "_downloads/" + filename;
        var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
        return sd_path;
	}
	 /*<img>设置图片
     *1.从本地获取,如果本地存在,则直接设置图片
     *2.如果本地不存在则联网下载,缓存到本地,再设置图片
     * */
    
    owner.setImg = function (imgId, loadUrl) {
        if (imgId == null || loadUrl == null) return;
        //图片下载成功 默认保存在本地相对路径的"_downloads"文件夹里面, 如"_downloads/logo.jpg"
        var filename = loadUrl.substring(loadUrl.lastIndexOf("/") + 1, loadUrl.length);
        var relativePath = "_downloads/" + filename;
        //检查图片是否已存在
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
//          console.log("图片存在,直接设置=" + relativePath);
            //如果文件存在,则直接设置本地图片
            owner.setImgFromLocal(imgId, relativePath);
        }, function(e) {
//          console.log("图片不存在,联网下载=" + relativePath);
            //如果文件不存在,联网下载图片
            owner.setImgFromNet (imgId,loadUrl,relativePath);
        });
    }

    /*给图片标签<img>设置本地图片
     * imgId 图片标签<img>的id
     * relativePath 本地相对路径 例如:"_downloads/logo.jpg"
     */
     owner.setImgFromLocal = function (imgId, relativePath) {
        //本地相对路径("_downloads/logo.jpg")转成SD卡绝对路径("/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/downloads/logo.jpg");
        var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
        //给<img>设置图片
//		$id(imgId).setAttribute("src", sd_path);
//		$id(imgId).src = sd_path;
//		$id(imgId).setAttribute("data-lazyload", sd_path);
		try{
			$id(imgId).src = sd_path;
			$id(imgId).setAttribute("data-lazyload", sd_path);
		}catch(e){
			//TODO handle the exception
			console.log(e)
		}
		
		
    }

    /*联网下载图片,并设置给<img>*/
    owner.setImgFromNet = function (imgId,loadUrl,relativePath) {
        //先设置下载中的默认图片
//      $id(imgId).setAttribute("src", "../images/loading.gif");
        //创建下载任务
        var dtask = plus.downloader.createDownload(loadUrl, {
        	method: 'GET',
    		filename: relativePath
        }, function(d, status) {
            if (status == 200) {
                //下载成功
//              console.log("下载成功=" + relativePath);
                owner.setImgFromLocal(imgId, d.filename);
            } else {
                //下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
//              console.log("下载失败=" + status+"=="+relativePath);
                //dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
                if (relativePath!=null)
                    owner.delFile(relativePath);
            }
        });
        //启动下载任务
        dtask.start();
    }

    /*删除指定文件*/
    owner.delFile = function (relativePath) {
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
            entry.remove(function(entry) {
                console.log("文件删除成功==" + relativePath);
            }, function(e) {
                console.log("文件删除失败=" + relativePath);
            });
        });
    }
	 /*根据id查找元素*/
    function $id(id) {
        return document.getElementById(id);
    }
    //将BASE 64保存为文件
	owner.baseImgFile = function(uid, base64, quality, callback) {
		owner.delFile("_doc/" + uid + ".jpg");
		
        quality = quality || 10;
        callback = callback || $.noop;
        var bitmap = new plus.nativeObj.Bitmap();
        // 从本地加载Bitmap图片
        bitmap.loadBase64Data(base64, function() {
            console.log('加载图片成功');
            bitmap.save("_doc/" + uid + ".jpg", {
                overwrite: true,
                quality: quality
            }, function(i) {
                callback(i);
                console.log('保存图片成功：'+JSON.stringify(i));
            }, function(e) {
                console.log('保存图片失败：' + JSON.stringify(e));
            });
        }, function(e) {
            console.log('加载图片失败：' + JSON.stringify(e));
        });
    }
	//打开软键盘
	//***** 强制打开软键盘  Begin******  
    var _softKeyboardwebView, _imm, _InputMethodManager, _isKeyboardInited = false;  
    // 打开软键盘  
    owner.initSoftKeyboard = function() {  
        if (mui.os.ios) {  
            _softKeyboardwebView = plus.webview.currentWebview().nativeInstanceObject();  
        } else {  
            _softKeyboardwebView = plus.android.currentWebview();  
            plus.android.importClass(_softKeyboardwebView);  
            _softKeyboardwebView.requestFocus();  
            var Context = plus.android.importClass("android.content.Context");  
            _InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");  
            var main = plus.android.runtimeMainActivity();  
            _imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);  
        }  
        _isKeyboardInited = true;  
    }  
  
    // 打开软键盘  
    owner.openSoftKeyboard = function() {  
        if (!_isKeyboardInited) {  
            owner.initSoftKeyboard();  
        }  
        if (mui.os.ios) {  
            _softKeyboardwebView.plusCallMethod({  
                "setKeyboardDisplayRequiresUserAction": false  
            });  
        } else {  
            _imm.toggleSoftInput(0, _InputMethodManager.SHOW_FORCED);  
        }  
    }  
  
    // 控件获得焦点并弹出软键盘  
       // input：需要获得焦点的控件  
        owner.focusAndOpenKeyboard = function(input) {  
        setTimeout(function() {  
            input.focus();  
            owner.openSoftKeyboard();  
        }, 200);  
    }  
}(mui, window.app = {}));