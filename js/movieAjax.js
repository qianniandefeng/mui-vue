(function($, owner, v) {
    var user = JSON.parse(localStorage.getItem('_user_'))||{} ;
	var token =  'Bearer ' + user.token;
//	owner.server = 'http://192.168.1.102:8080';
	owner.server = 'http://www.36le.com';
	var memid = user.memid;
	
	function etype(arg1){
		if(arg1 == 'abort'){
			$.toast('网络异常，请检查网络设置！');
		}else if(arg1 == 'timeout'){
			$.toast('请求超时，请稍后再试');
		}else if(arg1 == 'parsererror'){
			$.toast('返回数据格式错误');
		}else{
			$.toast('服务器请求失败');
		}
		$('button').button('reset');
	}
	/*function errFunction(msg, type, errorThrown){
		mui('button').button('reset');
		console.log(JSON.stringify(msg))
		console.log(type)
		console.log(errorThrown)
		mui.toast('请求数据发生错误');
	}	
	function errPost(msg){
		mui('button').button('reset');
		mui.toast('请求数据发生错误');
	}*/	
	function toLogin(SStatus){
		if(SStatus=="timeout"){
            mui.openWindow({
                url: '../html/login.html',
                id: 'login',
                preload: true,
                show: {
                    aniShow: 'pop-in'
                },
                styles: {
                    popGesture: 'hide'
                },
                waiting: {
                    autoShow: false
                }
            });
         //如果超时就处理 ，指定要跳转的页面                                  
         }
	}
	owner.restartToken = function(newToken){
		token = 'Bearer ' + newToken;
	}
	owner.restartmemid = function(mid){
		memid = mid;
	}
//	校验token
	owner.refreshToken = function(t,callback){
		$.ajax({
			url: owner.server + '/sms/refreshToken',
			dataType: 'string',
			data: 'token=' + t,
			type: 'get',
			headers: {'Content-Type': 'application/json'},
			success: function (data) {
				return callback(data);
				
			},
			error: function(message){
				errFunction(message)
			}
		});
	}
	owner.getBlockTaskPage = function (stat, page, callback, errFun) {//片方请求数据库中的数据
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
			url: owner.server + '/film/getBlockTaskPage',
			dataType: 'json',
			data: 'memid=' + memid + '&page=' + page + '&status=' + stat,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
			type: 'get',
			headers: {'Content-Type': 'application/json'},
			success: function (data) {
				// 请求成功
				return callback(data)
			},
			error: function(xhr,type,errorThrown){
				etype(type);
				if(errFun){
					
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
		});
	}
	//发布新任务
	owner.pushNewTask = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/pushNewTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	
	//院线经理初次接单
	owner.takeTaskOrder = function(vueData, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		console.log(ntoken)
		$.ajax({
	        url: owner.server + '/film/takeTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//院线经理提交审核
	owner.submitCheckTask = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateBlockTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//任务完成，提交凭证
	owner.applyCheckTask = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/applyCheckTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//经理获取待处理事件条数
	owner.getNotifyTaskByID= function(check, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getNotifyTaskByID',
			dataType: 'json',
			data: 'memid=' + memid + '&status=0&check=' + check,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
			type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//更新信息，不支持新增任务
	owner.updateBlockTask = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateBlockTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//审核’任务完成方’提交的资料
	owner.checkTaskOrder = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/checkTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//根据电影id搜索
	owner.getFilmDataByID= function(id,callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getFilmDataByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//根据电影id搜索
	owner.getHostFilmByID= function(id,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getHostFilmByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//根据电影id,xiangbaochang字段修改
	owner.updateHostFilm = function(filmid, num, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateHostFilm',
	        dataType: 'json',
	        data: 'id=' + filmid + '&number=' + num,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//根据电影名称模糊搜索
	owner.getFilmDataLike= function(name,callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getFilmDataLike',
	        dataType: 'json',
	        data: 'name='+name,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//获取全部影片任务信息
	owner.getAllTaskPage= function(stat, page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getAllTaskPage',
			dataType: 'json',
			data: 'page=' + page + '&status=' + stat,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
			type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取最近影片信息
	owner.getPresaleFilmLike= function(name, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getPresaleFilmLike',
	        dataType: 'json',
	        data: 'name='+name,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	owner.getPresaleFilmByID=function(id,callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getPresaleFilmByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//根据电影id获取电影关联任务
	owner.getBlockTaskByFilmId= function(filmId, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getBlockTaskByFilmId',
	        dataType: 'json',
	        data: 'filmid='+filmId,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	
	//获取热映电影
	owner.getAllHostFilms= function(page, callback,errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getAllHostFilms',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取即将上映电影
	owner.getAllPresaleFilms= function(page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getAllPresalFilms',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	
	//院线经理获取已领取的任务
	owner.getBlockTaskOrderPage = function(stat, page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
			url: owner.server + '/film/getBlockTaskOrderPage',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page + '&status=' + stat,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
				if(errFun){
					errFun(xhr,type);
				}
			}
		});
	}
	//院线经理获取已领取的任务
	owner.getTaskOrderByMemid = function(check, page, status, callback, errFun){//check,Page,status
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
			url: owner.server + '/film/getTaskOrderByMemid',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page + '&check=' + check + '&status=' + status,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
		});
	}
	//通过ID获取单个任务详情
	owner.getBlockTaskByID = function(id,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
			url: owner.server + '/film/getBlockTaskByID',
	        dataType: 'json',
	        data: 'id=' +id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
		});
	}
	//通过ID删除单个任务详情
	owner.deleteBlockTaskOrder = function(id,callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
			url: owner.server + '/film/deleteBlockTaskOrder',
	        dataType: 'json',
	        data: 'id=' +id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
		});
	}
	//根据片方发布任务id获取全部接单
	owner.getALLTaskOrderByRenwuID = function(id,page,status,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getALLTaskOrderByRenwuID',
	        dataType: 'json',
	        data: 'renwuid=' + id + '&page=' + page + '&status=' + status,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//根据片方id,获取全部影院接单
	owner.getTaskOrderByComID = function(id,page,check,status,callback,errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getTaskOrderByComID',
	        dataType: 'json',
	        data: 'comid=' + id + '&page=' + page + '&check=' + check + '&status=' + status,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	etype(type);
				if(errFun){
					
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//更新用户信息
	//片方
	owner.updateCertCompany = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateCertCompany?type=1',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	
	//按会员ID查询
	owner.getMemberByID = function(memid, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getMemberByID',
	        dataType: 'json',
	        data: 'id=' + memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	if(data&&data.memid){
//	        		owner.restartmemid(data.memid);
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type);
	        	}
			}
	    })
	}
	//更新个人信息
	owner.updateMembers = function(vueData, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateMembers',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg)
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type);
	        	}
			}
	    })
	}
	owner.upMembersByToken= function(rtoken,vueData, callback){
		var ntoken =  'Bearer ' + rtoken;
		$.ajax({
	        url: owner.server + '/film/updateMembers',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg)
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//更新头像
	owner.updateTitle = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/upload/title',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//获取邀请的好友列表
	owner.getReferrerPage = function(yaoqingma, page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getReferrerPage',
	        dataType: 'json',
	        data: 'memid=' + yaoqingma + '&page=' + page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//查片方ID所属公司信息
	owner.getCertCompany = function(memid, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getCertCompany',
	        dataType: 'json',
	        data: 'memid='+memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//更新片方信息
	owner.updateCertCompany = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateCertCompany',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//查院线经理ID所属公司信息
	owner.getCinemaByMemID = function(id, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getCinemaByMemID',
	        dataType: 'json',
	        data: 'memid=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//更新院线经理信息
	owner.updateCinema = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		console.log(ntoken);
		$.ajax({
	        url: owner.server + '/film/updateCinema',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	        	return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
		
	}
	//银行卡信息
	//获取列表
	owner.getBankCardPage = function(callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getBankCardPage',
	        dataType: 'json',
	        data: 'memid='+memid+'&page=1',
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//更新
	owner.updateBankCard = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateBankCard',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//删除
	owner.deleteBankCard = function(id, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/deleteBankCard',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//影片评论新增或更新
	owner.updateUserComment = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/updateUserComment',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//评论获取
	owner.getUserComments = function(page, filmid, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getUserComments',
	        dataType: 'json',
	        data: 'page='+page+'&filmid='+filmid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取影视快讯
	owner.getFilmNews = function(page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getFilmNews',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	owner.getAllInfo = function(page,callback,errFun){
		$.ajax(owner.server + '/film/getFilmNews',{
			data:'page='+page,
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:1000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				return callback(data);
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				etype(type);
				if(errFun){
					
					return errFun(xhr,type,errorThrown);
				}
				
			}
		});
	}
	//获取影视快讯（下拉随机5条）
	owner.getRandNews5 = function(page, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getRandNews5',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//通过id获取指定影视资讯
	owner.getFilmNewsByID = function(id, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getFilmNewsByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取发行通知
	owner.getNotifyNews = function(page, classid, title, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getNotifyNews',
	        dataType: 'json',
	        data: 'page=' + page + '&classid=' + classid +'&title=' + title,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//模糊搜索新闻
	owner.searchInfo = function(page, title, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/searchinfo',
	        dataType: 'json',
	        data: 'page=' + page + '&title=' + title,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
				if(errFun){
					errFun(xhr,type)
				}
			}
	    })
	}
	//获取推送得到的消息
	owner.getIMessagePage = function(page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getIMessagePage',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				
				if(errFun){
					etype(type);
					errFun(xhr,type)
				}
			}
	    })
	}
	//根据id获取推送得到的消息
	owner.getMessageByID = function(id, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getMessageByID',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//获取推送得到的消息条数
	owner.getMessageCount = function(callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getMessageCount',
	        dataType: 'json',
	        data: 'memid=' + memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//获取小喇叭消息
	owner.getBroadcast = function(callback,errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getBroadcast',
	        dataType: 'json',
	        data: '',
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type);
	        	}
				
			}
	    })
	}
	//获取广告信息
	owner.getGuanggao = function(sex,age,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var dist = 0;
		var timeset = new Date().Format('yyyy-MM-dd hh:mm');
		$.ajax({
	        url: owner.server + '/film/getGuanggao',
	        dataType: 'json',
	        data: 'sex=' + sex + '&age=' + age + '&dist=' + dist + '&timeset=' + timeset,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type)
	        	}
			}
	    })
		/*plus.geolocation.getCurrentPosition(function(data){
			console.log(data.address.cityCode)
		})*/
	}
	//根据ID获取活动信息
	owner.getGuanggaoById = function(id,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getGuanggaoById',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type);
	        	}
				
			}
	    })
	}
	//获取活动信息
	owner.getActivitys = function(page,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getActivitys',
	        dataType: 'json',
	        data: 'page=' + page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	etype(type);
				if(errFun){
					
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//根据ID获取活动信息
	owner.getActivitysByID = function(id,callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getActivitysByID',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type)
	        	}
			}
	    })
	}
	//积分兑换，获取列表
	owner.getGiftsPage = function(page, stat, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getGiftsPage',
	        dataType: 'json',
	        data: 'page=' + page + '&status=' + stat,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type);
	        	}
				
			}
	    })
	}
	//根据id查看礼品详情
	owner.getGiftsByID = function(id, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getGiftsByID',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//积分兑换，兑换
	owner.exchangeGifts = function(id, callback){//id为商品id
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/exchangeGifts',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r == '-1'){
	        		return plus.nativeUI.toast(data.msg);
	        	}else if(data.r == '-2'){
	        		if(data.code == '1001'){
	        			return plus.nativeUI.toast('礼品卡数量不足或会员未认证');
	        		}
	        		if(data.code == '1002'){
	        			return plus.nativeUI.toast('会员剩余可用积分不足');
	        		}
	        		if(data.code == '1003'){
	        			return plus.nativeUI.toast('服务器请求失败');
	        		}
	        		if(data.code == '1004'){
	        			return plus.nativeUI.toast('服务器请求失败');
	        		}
	        		if(data.code == '1005'){
	        			return plus.nativeUI.toast('服务器请求失败');
	        		}
	        		if(data.code == '1006'){
	        			return plus.nativeUI.toast('服务器请求失败');
	        		}
	        		if(data.code == '1007'){
	        			return plus.nativeUI.toast('服务器请求失败');
	        		}
	        	}else{
	        		return callback(data);
	        	}
	            
	        },
	        error: function(msg,type){
	        	etype(type);
			}
	    })
	}
	//兑换完成后的礼品卡列表
	owner.getMyGiftPage = function(page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getMyGiftPage',
	        dataType: 'json',
	        data: 'page=' + page + '&memid=' + memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
				
				if(errFun){
					etype(type);
	        		errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取积分交易日志
	owner.getJifenRizhiPage = function(page, type, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getJifenRizhiPage',
	        dataType: 'json',
	        data: 'page=' + page + '&type=' + type + '&memid=' + memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//获取积分单条日志详情
	owner.getJifenRizhiByID = function(id, callback){//id为日志id
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getJifenRizhiByID',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//支付
	owner.payMoney = function(payData, callback){
		$.ajax({
	        url: owner.server + '/pay/sign',
	        dataType: 'text',
	        data: payData,
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	           
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	
	//提现记录
	owner.getTixianJilu = function(page, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		var memid =  app.getUser().memid;
		$.ajax({
	        url: owner.server + '/film/getTixianJilu',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
				if(errFun){
					errFun(xhr,type)
				}
			}
	    })
	}
	owner.getMoney = function(getData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/toaccount',
	        dataType: 'json',
	        data: getData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	console.log(JSON.stringify(data))
	        	if(data.r<0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	           
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//问题反馈
	owner.insertCustomer = function(vueData, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/insertCustomer',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	etype(type);
	        	if(errFun){
	        		
					return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//添加影厅
	owner.addYingting = function(vueData, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/addYingting',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        complete : function(XMLHttpRequest, textStatus){
            	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus， 
            	toLogin(sessionstatus);
            },
	        success: function (data) {
	        	if(data.r < 0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	        },
	        error: function(xhr,type){
	        	etype(type);
			}
	    })
	}
	//删除影厅
	owner.deleteYingting = function(id, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/deleteYingting',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//获取影厅
	owner.getYingtingByMemID = function(id,callback,errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getYingtingByMemID',
	        dataType: 'json',
	        data: 'memid=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	if(data.r<0){
	        		return plus.nativeUI.toast(data.msg);
	        	}
	            return callback(data);
	           
	        },
	        error: function(xhr,type){
	        	if(errFun){
	        		etype(type);
	        		errFun(xhr,type)
	        	}
				
			}
	    })
	}
	//获取邀请码
	owner.getReferrerNO = function(id,callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		console.log(id)
		$.ajax({
	        url: owner.server + '/film/getReferrerNO',
	        dataType: 'string',
	        data: 'memid=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//任务推荐
	owner.getRecommedTasks = function(title, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getRecommedTasks',
	        dataType: 'json',
	        data: 'page=1&title=' + title,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//新闻推荐
	owner.getRecommendNews = function(title, callback){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/film/getRecommendNews',
	        dataType: 'json',
	        data: 'page=1&title=' + title,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type){
				etype(type);
			}
	    })
	}
	//解析照片
	owner.parseimg = function(imgurl, callback, errFun){
		var ntoken =  'Bearer ' + app.getUser().token;
		$.ajax({
	        url: owner.server + '/ocr/parseimg?type=mp',
	        dataType: 'json',
	        data: 'imgurl=' + imgurl,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', ntoken);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(xhr,type,errorThrown){
	        	
				if(errFun){
					etype(type);
	        		return errFun(xhr,type,errorThrown);
	        	}
			}
	    })
	}
	//通讯
	
	//验证连接是否有效
	owner.validateImage = function (url){    
        var xmlHttp ;
        if (window.ActiveXObject)
         {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         else if (window.XMLHttpRequest)
         {
          xmlHttp = new XMLHttpRequest();
         } 
        xmlHttp.open("Get",url,false);
        xmlHttp.send();
        if(xmlHttp.status==404)
        return false;
        else
        return true;
    }
	//格式化图片
	v.filter('photo',function(value){
		var regu = /^\/company/;
		var regu2 = /^\/img/;
		var regu3 = /^\/\//;
		var regu4 = /^\/api/;
		var re = new RegExp(regu);
		var re2 = new RegExp(regu2);
		var re3 = new RegExp(regu3);
		var re4 = new RegExp(regu4);
		if(re.test(value)||re2.test(value)){
			return owner.server+value;
		}
		else if(re3.test(value)){
			return 'http:'+value;
		}
		else if(re4.test(value)){
			var newVal = value.replace(regu4,owner.server);
			return newVal;
		}
		else{
			return value;
		}
	})
	
	//格式化图片
	v.filter('touxiang',function(value){
		var logoImg = owner.server + '/company/' + value +'/'+ value + '.jpg';
		/*if(!validateImage(logoImg)){
			logoImg = owner.server + '/img/user-photo.png';
		}*/
		return logoImg;
	})
	//截取后四位数字
	v.filter('four',function(value){
		console.log(value)
		var str = value.substr(value.length - 4)
		return str;
	})
		//时间规格化
	v.filter('time',
//		<!-- value 格式为13位unix时间戳 -->
//		<!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
		function(value) {
			var date = new Date(value);
			Y = date.getFullYear(),
			m = date.getMonth() + 1,
			d = date.getDate(),
			H = date.getHours(),
			i = date.getMinutes(),
			s = date.getSeconds();
			if (m < 10) {
				m = '0' + m;
			}
			if (d < 10) {
				d = '0' + d;
			}
			if (H < 10) {
				H = '0' + H;
			}
			if (i < 10) {
				i = '0' + i;
			}
			if (s < 10) {
				s = '0' + s;
			}
			<!-- 获取时间格式 2017-01-03 10:13:48 -->
			// var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
			<!-- 获取时间格式 2017-01-03 -->
			var t = Y + '-' + m + '-' + d;
			return t;
		})
}(mui,window.aja = {},Vue))
