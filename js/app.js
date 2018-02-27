
(function($, owner) {
	/**
	 * 用户登录
	 **/
	//var server = 'http://192.168.6.204:8080';
	var server = 'http://www.36le.com';
	var stateText = localStorage.getItem('$state') || '{}';
	var currUser = JSON.parse(stateText);
	var token = 'Bearer ' + currUser.token;	
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
	owner.login = function(loginInfo, callback) {
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length != 11) {
			plus.nativeUI.toast('手机号为11个字符');
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
            beforeSend: function(request) {
            	request.setRequestHeader("Authorization", token);
              	plus.nativeUI.showWaiting('登录中...');
         	},
         	complete: function() {
		        plus.nativeUI.closeWaiting();
		    },
            type: 'post',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            success: function(data){
            	//登录成功后获取设备信息
            	data.deviceId = owner.getPushInfo();
            	aja.restartToken(data.token);//更新token
            	return callback(data);
            	
            },
			error: function(msg) {
                alert(JSON.stringify(msg));
                plus.nativeUI.toast('网络请求失败');
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
	         	return callback(data)
	        },
	        error: function(xhr, type, errorThrown) {
	     		// 请求失败
	         	mui.alert('网络请求错误')
	        }
	    });
	}
	
	owner.createState = function(info, callback) {
		var state = owner.getState();
		state.username = info.username;
		state.token = info.token;
		owner.setState(state);
		return callback();
	};
	
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
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	owner.setUser = function(user) {
		user = user || {};
		localStorage.setItem('_user_',JSON.stringify(user));
	}
	owner.getUser = function() {
		var userText = localStorage.getItem('_user_') || "{}";	
		return JSON.parse(userText);
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
	owner.mainPage = function (m){ 
		$.openWindow({
			url: m+'.html',
			id: m,
			preload: true,
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
	
}(mui, window.app = {}));