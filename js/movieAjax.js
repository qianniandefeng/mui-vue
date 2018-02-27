(function($, owner, v) {
    var stateText = localStorage.getItem('$state') || "{}";
    var currUser = JSON.parse(stateText);
	var token = 'Bearer ' + currUser.token;
	owner.server = 'http://www.36le.com';
	//owner.server ="http://192.168.6.204:8080";
	var userText = localStorage.getItem('_user_') || "{}";
	var memid = JSON.parse(userText).memid;
	
	function errFunction(msg){
		mui('button').button('reset');
		console.log(JSON.stringify(msg))
		//mui.toast('请求数据发生错误');
	}	
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
	owner.downAjax = function (stat, page, callback) {//片方请求数据库中的数据--刷新
		$.ajax({
			url: owner.server + '/film/getBlockTaskPage',
			dataType: 'json',
			data: 'memid=' + memid + '&page=' + page + '&status=' + stat,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
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
	owner.upAjax = function (stat, page, callback) {//片方请求数据库中的数据--加载
		$.ajax({
			url: owner.server + '/film/getBlockTaskPage',
			dataType: 'json',
			data: 'memid=' + memid + '&page=' + page + '&status=' + stat,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
			type: 'get',
			headers: {'Content-Type': 'application/json'},
			success: function (data) {
				// 请求成功
				return callback(data)
			},
			error: function(message){
				errFunction(message)
			}
		});
	}
	//发布新任务
	owner.pushNewTask = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/pushNewTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新任务，不支持新增任务
	owner.updateBlockTask = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateBlockTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	
	//院线经理初次接单
	owner.takeTaskOrder = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/takeTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//院线经理提交审核
	owner.submitCheckTask = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateBlockTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//任务完成，提交凭证
	owner.applyCheckTask = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/applyCheckTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新信息，不支持新增任务
	owner.updateBlockTask = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateBlockTask',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//审核’任务完成方’提交的资料
	owner.checkTaskOrder = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/checkTaskOrder',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据电影id搜索
	owner.getFilmDataByID= function(id,callback){
		$.ajax({
	        url: owner.server + '/film/getFilmDataByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据电影id搜索
	owner.getHostFilmByID= function(id,callback){
		$.ajax({
	        url: owner.server + '/film/getHostFilmByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据电影id,xiangbaochang字段修改
	owner.updateHostFilm= function(filmid, num, callback){
		$.ajax({
	        url: owner.server + '/film/updateHostFilm',
	        dataType: 'json',
	        data: 'id=' + filmid + '&number=' + num,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据电影名称模糊搜索
	owner.getFilmDataLike= function(name,callback){
		$.ajax({
	        url: owner.server + '/film/getFilmDataLike',
	        dataType: 'json',
	        data: 'name='+name,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取全部影片信息
	owner.getAllTaskPage= function(stat, page, callback){
		$.ajax({
	        url: owner.server + '/film/getAllTaskPage',
			dataType: 'json',
			data: 'page=' + page + '&status=' + stat,
			beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
			type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取最近影片信息
	owner.getPresaleFilmLike= function(name, callback){
		$.ajax({
	        url: owner.server + '/film/getPresaleFilmLike',
	        dataType: 'json',
	        data: 'name='+name,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	owner.getPresaleFilmByID=function(id,callback){
		$.ajax({
	        url: owner.server + '/film/getPresaleFilmByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据电影id获取电影关联任务
	owner.getBlockTaskByFilmId= function(filmId, callback){
		$.ajax({
	        url: owner.server + '/film/getBlockTaskByFilmId',
	        dataType: 'json',
	        data: 'filmid='+filmId,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	
	//获取热映电影
	owner.getAllHostFilms= function(page, callback){
		$.ajax({
	        url: owner.server + '/film/getAllHostFilms',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取即将上映电影
	owner.getAllPresaleFilms= function(page, callback){
		$.ajax({
	        url: owner.server + '/film/getAllPresalFilms',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	
	//院线经理获取已领取的任务
	owner.getBlockTaskOrderPage = function(stat, page, callback){
		$.ajax({
			url: owner.server + '/film/getBlockTaskOrderPage',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page + '&status=' + stat,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
		});
	}
	//院线经理获取已领取的任务
	owner.getTaskOrderByMemid = function(check, page, callback){//check,Page
		$.ajax({
			url: owner.server + '/film/getTaskOrderByMemid',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page + '&check=' + check,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
		});
	}
	//通过ID获取单个任务详情
	owner.getBlockTaskByID = function(id,callback){
		$.ajax({
			url: owner.server + '/film/getBlockTaskByID',
	        dataType: 'json',
	        data: 'id=' +id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
		});
	}
	//通过ID删除单个任务详情
	owner.deleteBlockTaskOrder = function(id,callback){
		$.ajax({
			url: owner.server + '/film/deleteBlockTaskOrder',
	        dataType: 'json',
	        data: 'id=' +id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
		});
	}
	//根据片方发布任务id获取全部接单
	owner.getALLTaskOrderByRenwuID = function(id,page,status,callback){
		$.ajax({
	        url: owner.server + '/film/getALLTaskOrderByRenwuID',
	        dataType: 'json',
	        data: 'renwuid=' + id + '&page=' + page + '&status=' + status,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//根据片方id,获取全部影院接单
	owner.getTaskOrderByComID = function(id,page,check,callback){
		$.ajax({
	        url: owner.server + '/film/getTaskOrderByComID',
	        dataType: 'json',
	        data: 'comid=' + id + '&page=' + page + '&check=' + check,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	        	return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新用户信息
	//片方
	owner.updateCertCompany = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateCertCompany?type=1',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//影院经理
	owner.updateCinema = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateCinema?type=2',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//按会员ID查询
	owner.getMemberByID = function(memid, callback){
		$.ajax({
	        url: owner.server + '/film/getMemberByID',
	        dataType: 'json',
	        data: 'id='+memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新个人信息
	owner.updateMembers = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateMembers',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新头像
	owner.updateTitle = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/upload/title',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取邀请的好友列表
	owner.getReferrerPage = function(page, callback){
		$.ajax({
	        url: owner.server + '/film/getReferrerPage',
	        dataType: 'json',
	        data: 'memid='+memid+'&page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//查片方ID所属公司信息
	owner.getCertCompany = function(memid, callback){
		$.ajax({
	        url: owner.server + '/film/getCertCompany',
	        dataType: 'json',
	        data: 'memid='+memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新片方信息
	owner.updateCertCompany = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateCertCompany',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//查院线经理ID所属公司信息
	owner.getCinemaByMemID = function(memid, callback){
		$.ajax({
	        url: owner.server + '/film/getCinemaByMemID',
	        dataType: 'json',
	        data: 'memid='+memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新院线经理信息
	owner.updateCinema = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateCinema',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//银行卡信息
	//获取列表
	owner.getBankCardPage = function(callback){
		$.ajax({
	        url: owner.server + '/film/getBankCardPage',
	        dataType: 'json',
	        data: 'memid='+memid+'&page=1',
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//更新
	owner.updateBankCard = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateBankCard',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//删除
	owner.deleteBankCard = function(id, callback){
		$.ajax({
	        url: owner.server + '/film/deleteBankCard',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//影片评论新增或更新
	owner.updateUserComment = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/updateUserComment',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
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
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//评论获取
	owner.getUserComments = function(page, filmid, callback){
		$.ajax({
	        url: owner.server + '/film/getUserComments',
	        dataType: 'json',
	        data: 'page='+page+'&filmid='+filmid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取影视快讯
	owner.getFilmNews = function(page, callback){
		$.ajax({
	        url: owner.server + '/film/getFilmNews',
	        dataType: 'json',
	        data: 'page='+page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//通过id获取指定影视资讯
	owner.getFilmNewsByID = function(id, callback){
		$.ajax({
	        url: owner.server + '/film/getFilmNewsByID',
	        dataType: 'json',
	        data: 'id='+id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取推送得到的消息
	owner.getIMessagePage = function(page, callback){
		$.ajax({
	        url: owner.server + '/film/getIMessagePage',
	        dataType: 'json',
	        data: 'memid=' + memid + '&page=' + page,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//积分兑换，获取列表
	owner.getGiftsPage = function(page, stat, callback){
		$.ajax({
	        url: owner.server + '/film/getGiftsPage',
	        dataType: 'json',
	        data: 'page=' + page + '&status=' + stat,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//积分兑换，兑换
	owner.exchangeGifts = function(id, callback){//id为商品id
		$.ajax({
	        url: owner.server + '/film/exchangeGifts',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取积分交易日志
	owner.getJifenRizhiPage = function(page, type, callback){
		
		$.ajax({
	        url: owner.server + '/film/getJifenRizhiPage',
	        dataType: 'json',
	        data: 'page=' + page + '&type=' + type + '&memid=' + memid,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//获取积分单条日志详情
	owner.getJifenRizhiByID = function(id, callback){//id为日志id
		$.ajax({
	        url: owner.server + '/film/getJifenRizhiByID',
	        dataType: 'json',
	        data: 'id=' + id,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'get',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
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
	        error: function(message){
				errFunction(message);
			}
	    })
	}
	//问题反馈
	owner.insertCustomer = function(vueData, callback){
		$.ajax({
	        url: owner.server + '/film/insertCustomer',
	        dataType: 'json',
	        data: vueData,
	        beforeSend: function(request) {
            	request.setRequestHeader('Authorization', token);
            },
	        type: 'post',
	        headers:{'Content-Type':'application/json'},
	        success: function (data) {
	            return callback(data);
	        },
	        error: function(message){
				errFunction(message)
			}
	    })
	}
	//格式化图片
	v.filter('photo',function(value){
		var regu = /^\/company/;
		var regu2 = /^\/img/;
		var regu3 = /^\/\//;
		var re = new RegExp(regu);
		var re2 = new RegExp(regu2);
		var re3 = new RegExp(regu3);
		if(re.test(value)||re2.test(value)){
			return owner.server+value;
		}
		else if(re3.test(value)){
			return 'http:'+value;
		}
		else{
			return value;
		}
	})
	
	//格式化图片
	v.filter('touxiang',function(value){
		var logoImg = owner.server + '/company/' + value +'/'+ value + '.jpg';
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
