## tab选项卡示例教程-nativeObj原生模式tab（含底部凸起大图标）
## 概述

这是一个利用原生view控件绘制底部选项卡的示例，有以下几个特点：
1.首页显示第一个tab项内容，其余tab项内容为首页的子窗口，相比创建四个子窗口，显示速度更快，占用内存更少，消耗性能更小。
2.操作简单：选项卡常用于App首页，为加快渲染，首页的原生底部选项卡是在manifest.json中通过plus -> launchwebview -> subNViews 节点配置的；
3.绘制内容支持字体，图片，矩形区域
4.开发者自定义选项卡点击事件
5.同样支持页内绘制原生 view 控件，也就是说在非首页也可以使用此方法，参考示例：底部选项卡中央凸起悬浮大图标的绘制

#### 说明：中央凸起悬浮大图标，因涉及屏幕分辨率动态计算和为给出开发者页内手动绘制的示例的原因，放在首页plusReady事件中实现绘制的。该悬浮大图标支持点击事件，开发者可定制实现对应的点击逻辑。

## 应用截图

![截图](http://img-cdn-qiniu.dcloud.net.cn/uploads/article/20170623/04c03ba9ad4afa7d11735e52c771cf94.png)

## 快速体验

[流应用app下载](http://liuyingyong.cn/) --> 扫描下方二维码快速体验

![二维码](images/ma.png)


v-cloak用于大段
v-text用于单个标签
v-html用于带有标签的处理

## 使用教程

[教程参考](http://ask.dcloud.net.cn/article/12602)
## localStorage存储的数据
_user_://保存用户信息
	{
	    "memid": 1511167906752,
	    "comId": null,
	    "memName": "22223452345",
	    "memPwd": "343b1c4a3ea721b2d640fc8700db0f36",
	    "type": "2",
	    "mobile": "22223452345",
	    "email": null,
	    "isactived": null,
	    "flag": null,
	    "lastLogintime": "2018-01-05 09:54:25",
	    "regdate": "2017-11-24 06:25:02",
	    "expiryDate": null,
	    "roles": "ROLE_CINE",
	    "lastpasswordresetdate": "2018-01-12 09:54:24",
	    "titleImg": "/company/1511167906752/1511167906752.jpg?random=80909",
	    "deviceId": "a3de30e7aa4f63f2c1f8ba182bb2119d"
	}
__movieinfo_：//影片ID
_filmNewsId_: //电影快讯ID
_jidian_chang_：//影片发布的任务对象   抢
	{
	    "id": 1512547675380,
	    "memid": 1511167906751,
	    "filename": "王牌特工：特工学院",
	    "integral": 1000,
	    "remainintegral": 500,
	    "minticketprice": 50,
	    "minicount": 50,
	    "startdate": "2017-12-06",
	    "enddate": "2017-12-31",
	    "bili": 5,
	    "status": "0",
	    "createtime": "2017-12-06 07:59:42",
	    "filmId": null,
	    "titleImg": "http://p0.meituan.net/movie/c35fad6f9777b62a836d3b9ddfb8ae26479884.jpg@165w_220h",
	    "paybounty": null,
	    "frozen": null,
	    "ptbili": 5
	}
_pianfang_task_://同上
	{
	    "id": 1515400928352,
	    "memid": 1511167906751,
	    "filename": "移动迷宫3：死亡解药",
	    "integral": 100,
	    "remainintegral": 100,
	    "minticketprice": 40,
	    "minicount": 50,
	    "startdate": "2018-01-09",
	    "enddate": "2018/01/15 23:59:00",
	    "bili": 5,
	    "status": "0",
	    "createtime": "2018-01-08 08:42:10",
	    "filmId": 248639,
	    "titleImg": "http://p0.meituan.net/movie/16b410d5c58fce6b76c14775d946c3cc310492.jpg@165w_220h",
	    "paybounty": null,
	    "frozen": null,
	    "ptbili": 5
	}
_cinema_://发布任务时携带的电影信息
	{
	    "id": 71946,
	    "name": "无问西东",
	    "ename": "Forever Young",
	    "titleImg": "http://p0.meituan.net/movie/75352182978ae891abb55727f51c28b6305181.jpg@165w_220h",
	    "ctype": "剧情,爱情,战争",
	    "ltime": "中国大陆",
	    "playdate": "2018-01-12大陆上映",
	    "xiangkan": "20262",
	    "pingfen": "",
	    "fen910": null,
	    "fen58": null,
	    "fen14": null,
	    "xiangbaochang": null,
	    "yibaochang": null,
	    "istask": 1,
	    "bili": 15
	}
_jidian_task_://审核完成后 包场播放情况及审核信息
	{
	 	"id": 151254790983361,
	 	"memid": 1511167906752,
	 	"rewuid": 1512463612509,
	 	"showtime": "2017-12-06 16:11",
	 	"movehall": "1",
	 	"seatcount": 40,
	 	"ticketprice": 50,
	 	"bounty": 100,
	 	"status": "1",
	 	"checks": "3",
	 	"checkimgs": "[{\"url\":\"/company/201/2017/12/08/1/ff34cde35c48449d9e88ef1afd11fb15.jpg\"},{\"url\":\"/company/201/2017/12/08/0/af6602f44f564c3f89e4a39a3c756d21.jpg\"}]",
	 	"titleImg": "http://p0.meituan.net/movie/54/868271.jpg@165w_220h",
	 	"filmname": "阿凡达",
	 	"cmemId": 1511167906751,
	 	"applytime": "2017-12-08 05:29:04",
	 	"checktime": "2017-12-08 06:18:42",
	 	"remark": null,
	 	"createtime": "2017-12-06 08:03:37",
	 	"bili": null,
	 	"cinema": "北京三未信安科技发展有限公司"
	}
_otherTimeTask_://其他时间包场任务
	{
		"id": "",
		"memid": "1511167906752",
		"rewuid": 1515380202463,
		"filmname": "西游记女儿国",
		"cinemaLogo": "http://www.36le.com/img/user-photo.png",
		"showtime": "2018-1-11 9:45",
		"movehall": "1",
		"seatcount": 40,
		"ticketprice": 40,
		"status": 0,
		"bounty": "200",
		"checks": 0,
		"checkimgs": "[]",
		"cmemId": 1511167906751,
		"titleImg": "http://p0.meituan.net/movie/9efefcccb19036ae3529dfded0a9223c1765339.jpg@165w_220h"
	}
_msgObj_://我的消息 详情
 	{
		"id": 1,
		"memid": 1512025961202,
		"type": 1,
		"titleimg": "http://p0.meituan.net/movie/4255e4fbe98529326677572d84768942184091.jpg@750w_1l",
		"descripe": "如果是跑影院，就会简短一些，如果去到大学里面，就会跟同学们聊一下，听他们讲自己的感情故事。虽然他们都比较小孩，说的也都是自己高中啊大一时候的那些事",
		"isread": 0,
		"istop": 0,
		"createtime": "2018-01-09 16:00:00"
	},
