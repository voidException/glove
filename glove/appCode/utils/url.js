let commonUrl='http://172.16.32.70:8080/glove';

export const URLLogin=commonUrl+'/user/login';
export const URLRegister=commonUrl+'/user/register';
export const URLFindPasswd=commonUrl+'/user/findpassword';

export const URLUserPageWeibo=commonUrl+'/userpage/weibos/gettweetbyuserid'; //咋userPage页面查看对方发布的微博
export const URLTuiwenPage =commonUrl+'/weibos/gettweetbyuserid'; //适合查看自己发布转发的
export const URLmainPageWeiBo=commonUrl+'/weibos/gettuiwenlists';//适合查用户关注的推文

export const URLItemPage=commonUrl+'/item/list';
export const URLWheelImg=commonUrl+'/picture/getpicture';
//以下5个地址，都在PeopleListPage中使用，为减少复杂度，所传递的参数一样
export const UrlCommomPeopleList=commonUrl+'/peoplelist/lsmen'; //1普通，2社团，3监督，4青年志愿者，5社会公益机构 
export const UrlWatchList=commonUrl+'/peoplelist/watchs'; //我关注的人列表  10
export const UrlFansList=commonUrl+'/peoplelist/fans';   //我的粉丝   11
export const UrlHelpMeList=commonUrl+'/peoplelist/helpme';  //帮助我的人列表   20
export const UrliHelpList=commonUrl+'/peoplelist/ihelp'; //我帮助的人列表    21
export const UrligongyiList=commonUrl+'/peoplelist/donater';  //公益排行榜

export const UrlUploadFile=commonUrl+'/demo/upload/multiUpload'; //发表推文
export const UrldoZhuanfa=commonUrl+'/weibos/zhuanfaTweet'; //转发推文
export const UrlcommentList=commonUrl+'/tweetcomment/listcomments';//一条推文的评论列表

export const UrlAddNeedMan=commonUrl+'/cash/addhelpman'; //增加一个需要帮助的人
export const UrlJoinLoveClue=commonUrl+'/renzheng/author'; //加入爱心社认证,监督处认证，身份认证
export const UrlpostAffirm=commonUrl+'/zhengshi/affirm'; //这是发布一条证实的接口地址 
export const UrladdCommont=commonUrl+'/tweetcomment/addcomment'; //这个是增加一条评论的
export const UrlConfirmReport=commonUrl+'/confirm/report'; //举报推文


export const Urlresetpass=commonUrl+'/user/resetpass'; //重置密码
export const UrlcompleteProfile=commonUrl+'/profile/completeProfile';
export const UrluploadPhoto=commonUrl+'/photo/upload';

export const UrldoWatch=commonUrl+'/watch/dowatch'; //关注一个人
export const UrlcancelWatch=commonUrl+'/watch/cancelwatch'; //取消关注一个人

export const  UrlByAtgetUserProfile=commonUrl+'/user/getprofile/bynickname';

export const UrlDeleteTwitter=commonUrl+'/weibos/deleteTweetByID'; //删除一条推文

export const UrlCashRecord=commonUrl+'/cash/getcashrecord';

export const UrlAffirmList=commonUrl+'/confirm/getconfirmls'; //affirm 中，获取证实人列表



























