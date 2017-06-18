var JobInfo=require('../models').JobInfo; //引入刚才定义的 jobInfo 实体类.


exports.job_save=function(callback){
    //实例化时传入一个对象
    var jobInfo=new JobInfo({
        user_id:'11111',
        title:"测试1",
        company:"aaa",
        isvip:false,
        area:"玉泉",
        jobyear:5,
        address:"bbbbb",
        pay:"10",
        content:"cccccc",
        mobile:"13800138000",
        email:"dd@ee.com",
        ext:""
    });
    //调用 jobInfo 对象上的 save 方法.
    jobInfo.save().then(function(result){
        //callback 直接返回给了控制层
        callback(null,result);
    }).catch(function(err){
        //异常返回
        callback(err,null)
    });
};


exports.job_select_all=function(callback){
    var jobInfo=new JobInfo();
    jobInfo.selectAll().then(function(result){
        callback(null,result);
    }).catch(function(err){
        //异常返回
        callback(err,null)
    });
}
