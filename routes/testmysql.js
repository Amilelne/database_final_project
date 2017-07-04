/**
 * Created by liliz on 2017/7/4.
 */
var query=require("./mysql_pool");

query("select * from users", [1], function(err,results,fields){
    //do something
    console.log(results)
});
