var _Base=require('./_Base');
var util=require('util');
var _=require('lodash');

function JobInfo(obj){
    this.params=obj;
}

util.inherits(JobInfo,_Base);

JobInfo.prototype.sql_option={
    "select_all":"SELECT * FROM job",
    "insert":"INSERT INTO job(user_id,title,company,isvip,area,jobyear,address,pay,content,mobile,email,ext) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)"
};

JobInfo.prototype.save=function(){
    return this._query(this.sql_option.insert,_.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

JobInfo.prototype.selectAll=function(){
    return this._query(this.sql_option.select_all,[]).then(function(result){
        return result;
    });
}

module.exports = JobInfo;
